import React from 'react';
import QuestionActions from './questionActions';

class QuestionAnswers extends React.Component {
    constructor (props) {
        super(props);

        const categoryId = props.categoryId || 1;
        const questionId = props.questionId || 1;

        this.state = {
            categoryId,
            questionId,
            path: {
                categories: []
            }
        };

        this.toNextQuestion = this.toNextQuestion.bind(this);
        this.toPreviousQuestion = this.toPreviousQuestion.bind(this);
        this.shouldQuestionDisplay = this.shouldQuestionDisplay.bind(this);
    }
    canMount () {
        const { componentDefinition } = this.props;

        if (!componentDefinition) {
            console.error('Component Definition is missing');
            return false;
        } else if (!componentDefinition.questionView) {
            console.error('Question view is missing');
            return false;
        } else if (!componentDefinition.answerCheckView) {
            console.error('Answer check view is missing');
            return false;
        } else if (!componentDefinition.answerTextView) {
            console.error('Answer text view is missing');
            return false;
        } else if (!componentDefinition.answerPhotoView) {
            console.error('Answer photo view is missing');
            return false;
        }

        return true;
    }

    componentDidMount () {
        if (!this.canMount()) {
            throw '"componentDefinition" property must be defined';
        }
    }


    render () {
        const { componentDefinition } = this.props;
        const { categoryId, questionId, path } = this.state;

        // Get the category and question to be displayed
        const category = this.getCategoryFromId(categoryId);
        const question = this.getQuestionFromId(category, questionId);

        // Get the current answer for this category and question, in a case that we're going back,
        // and it was previously answered already
        const answeredCategory = path.categories ? path.categories.find(cat => cat.categoryId === category.categoryId) : undefined;
        const currentAnswers = answeredCategory ? answeredCategory.questions.find(que => que.questionId === question.questionId) : undefined;

        return <QuestionActions
            category={category}
            question={question}
            componentDefinition={componentDefinition}
            currentAnswers={currentAnswers}
            isPreviousEnabled={this.isPreviousEnabled()}
            toNextQuestion={this.toNextQuestion}
            toPreviousQuestion={this.toPreviousQuestion} />;
    }

    isPreviousEnabled() {
        const { data } = this.props;
        const { categoryId, questionId } = this.state;

        let categoryIndex = data.categories.findIndex(x => x.categoryId === categoryId);
        let questionIndex = data.categories[categoryIndex].questions.findIndex(x => x.questionId === questionId);

        questionIndex--;
        categoryIndex--;

        if (questionIndex < 0) {
            if(categoryIndex < 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    toPreviousQuestion() {
        let { categoryId, questionId, path } = this.state;
        if (path && path.categories.length > 0) {
            // Get the current category
            let categoryIndex = path.categories.findIndex(x => x.categoryId === categoryId);

            if (categoryIndex !== -1) {
                // If there's a category
                const currentCategory = path.categories[categoryIndex];

                // Get the last answered index and go back by one
                let questionIndex = currentCategory.questions.length - 1;
                questionId = currentCategory.questions[questionIndex].questionId;

                // Clean up answers
                if(questionIndex === 0) {
                    path.categories.splice(categoryIndex, 1);
                } else {
                    currentCategory.questions.splice(questionIndex, 1);
                    path.categories[categoryIndex] = currentCategory;
                }
            } else {
                // If there's no category, we're going back without answering for this category yet
                categoryIndex = path.categories.length - 1;

                // So we get the previous category
                const previousCategory = path.categories[categoryIndex];
                categoryId = previousCategory.categoryId;

                // Then get the last question for this category
                const questionIndex = previousCategory.questions.length - 1;
                questionId = previousCategory.questions[questionIndex].questionId;

                //Clean up answers
                previousCategory.questions.splice(questionIndex, 1);
                path.categories[categoryIndex] = previousCategory;
            }


            this.setState({ categoryId, questionId, path });
        }
    }

    toNextQuestion(answeredQuestions, nextQuestionIndex) {
        let { path } = this.state;

        const category = this.getCategoryFromId(this.state.categoryId);

        if (answeredQuestions) {
            path = this.updateAnswers(answeredQuestions, category);
        }

        const { categoryId, questionId } = this.getNextQuestionId(nextQuestionIndex, path, category);

        this.setState({ categoryId, questionId, path });
    }

    getNextQuestionId(nextQuestionIndex, path, category) {
        const { data } = this.props;
        let { categoryId, questionId } = this.state;

        // Based on the id, get the next question
        if (!nextQuestionIndex) {
            nextQuestionIndex = this.getNextQuestionIndex(category, questionId);
        } else {
            nextQuestionIndex++;
        }

        // If there's no more questions in the category, change the category
        if (nextQuestionIndex > (category.questions.length - 1)) {
            const nextCategoryIndex = this.getNextCategoryIndex(categoryId);

            // If there's no more categories, finished
            if (nextCategoryIndex > (data.categories.length - 1)) {
                this.props.onFormSubmit(path);
            } else {
                // If there's a new category, go to the next category
                category = data.categories[nextCategoryIndex];
                categoryId = category.categoryId;

                // And to the first question of that category
                nextQuestionIndex = 0;
            }
        }

        const nextQuestion = category.questions[nextQuestionIndex];

        if (nextQuestion) {
            if (nextQuestion.shouldDisplay) {
                const answeredCategories = path.categories.find(x => x.categoryId === categoryId);

                // If not every condition is met, jump this question
                if (answeredCategories && !nextQuestion.shouldDisplay.every(condition => this.shouldQuestionDisplay(condition, answeredCategories))) {
                    return this.getNextQuestionId(nextQuestionIndex, path, category);
                }
            }
            questionId = nextQuestion.questionId;
        }

        return { categoryId, questionId };
    }

    shouldQuestionDisplay(displayCondition, answeredCategories) {
        if (answeredCategories.questions) {
            const answeredQuestion = answeredCategories.questions.find(x => x.questionId === displayCondition.questionId);
            if (answeredQuestion) {
                return answeredQuestion.answers && answeredQuestion.answers.some(x => x.answerId === displayCondition.answerId);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    updateAnswers(answeredQuestions, category) {
        let { categoryId, questionId, path } = this.state;

        // Get the current category to set the answers on that category
        const categoryIndex = path.categories.findIndex(x => x.categoryId === categoryId);

        let finishedCategories = undefined;
        // If there's no category, it is the first time we're setting an answer there
        if (categoryIndex === -1) {
            // So, create the category
            finishedCategories = {
                categoryId: category.categoryId,
                content: category.content,
                questions: new Array()
            };
        } else {
            finishedCategories = path.categories[categoryIndex];
        }

        // Set the answers for this question on the category
        const questionIndex = finishedCategories.questions.findIndex(x => x.questionId === questionId);
        if (questionIndex !== -1) {
            finishedCategories.questions[questionIndex] = answeredQuestions;
        } else {
            finishedCategories.questions.push(answeredQuestions);
        }

        // Upsert the category
        path.categories[categoryIndex !== -1 ? categoryIndex : path.categories.length] = finishedCategories;
        return path;
    }

    getCategoryFromId (categoryId) {
        const { data } = this.props;
        return data.categories.find(x => x.categoryId === categoryId);
    }

    getQuestionFromId (category, questionid) {
        return category.questions.find(x => x.questionId === questionid);
    }

    getNextCategoryIndex (categoryId) {
        const { data } = this.props;
        const categoryIndex = data.categories.findIndex(x => x.categoryId === categoryId);
        return categoryIndex + 1;
    }

    getNextQuestionIndex (category, questionId) {
        const questionIndex = category.questions.findIndex(x => x.questionId === questionId);
        return questionIndex + 1;
    }
}

export default QuestionAnswers;
