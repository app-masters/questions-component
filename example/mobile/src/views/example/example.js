import React from 'react';
import QuestionAnswers from './../../components/questionAnswers';
import QuestionView from './../questionAnswers/questionView';
import AnswerCheckView from './../questionAnswers/answerCheckView';
import AnswerTextView from './../questionAnswers/answerTextView';
import AnswerPhotoView from './../questionAnswers/answerPhotoView';

import { data } from './data.json';

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    render() {
        return <QuestionAnswers
            componentDefinition={{
                questionView: QuestionView,
                answerCheckView: AnswerCheckView,
                answerTextView: AnswerTextView,
                answerPhotoView: AnswerPhotoView,
            }}
            data={data}
            onFormSubmit={this.onFormSubmit} />;
    }

    onFormSubmit(answers) {
        console.log(answers);
    }
}

export default Example;
