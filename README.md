Questions component is a component used to make forms in a QnA style. It receives the views that will be used to render questions and also for each one of answer type. It also receives the data, which is the Json/Object used to render questions and answers.

## Installing 
You only need to run:
```
npm i @app-masters/questions-component --save
```

## Usage

**Before using the component, follow the installation and usage steps of each dependecy(look down) first.**

The starting point component is the ```QuestionAnswers``` component, you just got to import it, and call it giving the views you want to use.

You **have** to give it the custom views you want it to render. *But* it already comes with some default views that you can use and also help you implement your own.

Like this:
```js
import React from 'react';
import {
	QuestionAnswers,
	QuestionView,
	AnswerCheckView,
	AnswerTextView,
	AnswerPhotoView
} from '@app-masters/questions-component';

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
			data={this.props.data}
			onFormSubmit={this.onFormSubmit} />;
	}

	onFormSubmit(answers) {
		console.log(answers);
	}
}

export default Example;
```

## Metadata
As you can see on the example above, we are giving the component some ```data``` that for this example comes from ```this.props.data```. An example of this data is at the bottom of the page.

This metadata can be anything, but must follow the pattern:
```ts
Category -  
    Id: Int  
    Content: String  
    Questions: Question[]  

Question -  
    Id: Int  
    Type: "multiple", "single"  
    Content: String  
    Answers: Answer[]  
    ShouldDisplay: ShouldDisplay[]  

ShouldDisplay -  
    AnswerId: Int  
    QuestionId: Int

Answer -
    Id: Int  
    Type: "check", "input", "photo", "text"  
    Content: String  
```

**Any question can depend on any previous answer using the "ShouldDisplay" property, but it is important to know that, this dependent question must be placed on the array just after the *last* question it depends from.**

## Definitions
These are the component properties, and *all of them are required*:
```ts
    componentDefinition: {
        QuestionView, // This is the view that will be used to display a single question, this view shows the question title and the answer array
        AnswerCheckView, // This is the corresponding view for an answer of type "check"
        AnswerTextView, // This is the corresponding view for an answer of type "text"
        AnswerPhotoView, // This is the corresponding view for an answer of type "photo"
    },
    data: {}, // This is the data used to render the question tree
    onFormSubmit: (answers) => void // This is the callback that is called when the last question is answered
```  

## Dependencies
- **[ivpusic/react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)**: The component depend on this package to cut images on answers of type "photo"  
    **!Tip**: If after installing this package, you get the error: ```Could not find method METHOD_NAME for arguments```, try removing the line ```vectorDrawables.useSupportLibrary``` on your ```./android/app/build.gradle```.

- **[beefe/react-native-actionsheet](https://github.com/beefe/react-native-actionsheet)**: The component depend on this package so the action sheet that allows the user to select photo or gallery to shown.

- **[app-masters/react-native-ui-kit](https://github.com/app-masters/react-native-ui-kit)**: The component uses this ui kit for some of its styling.

**Before using the component, follow the installation and usage steps of each dependecy first.**

## Known errors
- If you get the error ```TypeError: Cannot read property 'ph3' of null```:  
    You are not calling ```startStyles(AppStyles)``` from the [app-masters/react-native-ui-kit](https://github.com/app-masters/react-native-ui-kit) dependecy. Check this dependecy installation instructions.

## Data example
This is an example of the metadata Json:
```json
{
    "data": {
        "categories": [
            {
                "categoryId": 1,
                "content": "Indicadores Nutricionais",
                "questions": [
                    {
                        "questionId": 1,
                        "type": "multiple",
                        "content": "Qual é a classificação da condição corporal do animal?",
                        "answers": [
                            {
                                "answerId": 1,
                                "type": "check",
                                "content": "Muito magro"
                            },
                            {
                                "answerId": 2,
                                "type": "check",
                                "content": "Magro"
                            },
                            {
                                "answerId": 3,
                                "type": "check",
                                "content": "Ideal"
                            },
                            {
                                "answerId": 4,
                                "type": "check",
                                "content": "Acima do peso"
                            },
                            {
                                "answerId": 5,
                                "type": "photo",
                                "content": "Tire uma foto"
                            }
                        ]
                    },
                    {
                        "questionId": 2,
                        "type": "text",
                        "content": "Qual seria o grau de mau trato?",
                        "answers": [
                            {
                                "answerId": 6,
                                "type": "text",
                                "content": "Descreva"
                            }
                        ]
                    },
                    {
                        "questionId": 3,
                        "type": "single",
                        "content": "O animal possui alimentação disponível?",
                        "answers": [
                            {
                                "answerId": 7,
                                "type": "check",
                                "content": "Sim"
                            },
                            {
                                "answerId": 8,
                                "type": "check",
                                "content": "Não"
                            }
                        ]
                    },
                    {
                        "questionId": 4,
                        "type": "single",
                        "content": "O que o animal come?",
                        "answers": [
                            {
                                "answerId": 9,
                                "type": "check",
                                "content": "Ração"
                            },
                            {
                                "answerId": 10,
                                "type": "check",
                                "content": "Comida caseira"
                            },
                            {
                                "answerId": 11,
                                "type": "text",
                                "content": "Outros"
                            }
                        ],
                        "shouldDisplay": [
                            {
                                "questionId": 3,
                                "answerId": 7
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```  
