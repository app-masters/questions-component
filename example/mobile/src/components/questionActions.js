import React from 'react';
import { View } from 'react-native';
import AnswerActions from './answerActions';

class QuestionActions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAnswers: this.props.currentAnswers ? this.props.currentAnswers : new Array(),
            deepQuestion: undefined,
        };

        this.renderAnswer = this.renderAnswer.bind(this);
        this.renderAnswers = this.renderAnswers.bind(this);
        this.onAnswerPress = this.onAnswerPress.bind(this);
        this.onAnswerChangeText = this.onAnswerChangeText.bind(this);
        this.onAnswerPhotoSelect = this.onAnswerPhotoSelect.bind(this);
        this.toPreviousQuestion = this.toPreviousQuestion.bind(this);
        this.toNextQuestion = this.toNextQuestion.bind(this);
    }

    // Return the render for a single answer
    renderAnswer(answer, i) {
        if (answer) {
            const { componentDefinition } = this.props;

            const currentAnswer = this.state.selectedAnswers.find(x => x.answerId === answer.answerId);

            let props = {
                answer,
                i,
                selected: currentAnswer !== undefined,
                value: currentAnswer !== undefined ? currentAnswer.content : '',
                onPress: this.onAnswerPress,
                onChangeText: this.onAnswerChangeText,
                onPhotoSelected: this.onAnswerPhotoSelect,
            };

            if (answer.type === 'check') {
                props = {
                    answerView: componentDefinition.answerCheckView,
                    ...props
                };
            } else if (answer.type === 'text') {
                props = {
                    answerView: componentDefinition.answerTextView,
                    ...props
                };
            } else if (answer.type === 'photo') {
                props = {
                    answerView: componentDefinition.answerPhotoView,
                    ...props
                };
            }

            return <AnswerActions {...props} />;
        }
    }

    // Return the mapper render for every answer
    renderAnswers(answers) {
        if (answers) {
            return answers.map((answer, i) => (
                <View key={answer.answerId}>
                    {this.renderAnswer(answer, i)}
                </View>
            ));
        }
    }

    render() {
        let { question, componentDefinition, category, isPreviousEnabled } = this.props;

        return React.createElement(componentDefinition.questionView, {
            subheading: category.content,
            question,
            isPreviousEnabled,
            isNextEnabled: this.isNextEnabled(),
            toPreviousQuestion: this.toPreviousQuestion,
            toNextQuestion: this.toNextQuestion
        }, this.renderAnswers);
    }

    // Handler for when an answer is clicked
    onAnswerPress(answer) {
        if (answer) {
            const { question } = this.props;

            if (question.type === 'single') {
                this.toggleArray(answer, false);
            } else if (question.type === 'multiple') {
                this.toggleArray(answer, true);
            }
        }
    }

    // Handler for when an text answer text is changed
    onAnswerChangeText(text, answer) {
        if (answer) {
            const { question } = this.props;

            const value = {
                ...answer,
                content: text
            };

            this.toggleArray(value, question.type === 'multiple' ? true : false, !text);
        }
    }

    // Handler for when an text answer text is changed
    onAnswerPhotoSelect(image, answer) {
        if (answer) {
            const { question } = this.props;

            const value = {
                ...answer,
                content: image
            };

            this.toggleArray(value, question.type === 'multiple' ? true : false, !image);
        }
    }

    // Adds or remove the selected answer from the answered questios array
    toggleArray(receivedAnswer, multiple, removeIfText = true) {
        let selectedAnswers = this.state.selectedAnswers;

        // Find if the received answer is already on the array
        const index = selectedAnswers.findIndex(answer => answer.answerId === receivedAnswer.answerId);

        // If it is, we want to remove it from the array(unselect)
        if (index !== -1 && removeIfText) {
            selectedAnswers.splice(index, 1);
        } else if (multiple) {
            // If we can select multiple questions, just push it
            selectedAnswers.push(receivedAnswer);
        } else {
            // If we can select only a single question, create an array with only this question
            selectedAnswers = new Array(receivedAnswer);
        }

        this.setState({ selectedAnswers });
    }

    // Handler for when the "previous" button is clicked
    toPreviousQuestion() {
        if (this.props.toPreviousQuestion && this.props.isPreviousEnabled) {
            // And then go back
            this.props.toPreviousQuestion();
        }
    }

    // Handler for when the "next" button is clicked
    toNextQuestion() {
        if (this.props.toNextQuestion && this.isNextEnabled()) {
            const { question } = this.props;
            const { selectedAnswers } = this.state;

            this.setState({ selectedAnswers: new Array() });

            // And then go to the next question
            this.props.toNextQuestion({
                questionId: question.questionId,
                content: question.content,
                answers: selectedAnswers
            });
        }
    }

    isNextEnabled () {
        const { selectedAnswers } = this.state;

        // Disable next button if there's no selected answer
        return selectedAnswers && selectedAnswers.length > 0 ? true : false;
    }
}

export default QuestionActions;
