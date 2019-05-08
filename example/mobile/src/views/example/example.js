import React from 'react';
import {
    AnswerCheckView,
    AnswerPhotoView,
    AnswerTextView,
    QuestionAnswers,
    QuestionView,
} from '@app-masters/questions-component';

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
