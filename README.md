# Q&A component:
O component de Q&A é um component utilizado para criar formulários de perguntas e respostas. Ele recebe as views que serão utilizadas para exibir as perguntas e cada uma das respostas, e também recebe o metadado que é o Json utilizado para montar as perguntas e respostas, seguindo o padrão:

Questions component is a component used to make forms in a QnA style. It receives the views that will be used to render questions and also for each one of answer type. It also receives the data, which is the Json/Object used to render questions and answers.

This data/metadata must follow the pattern:

```ts
Category -  
    Id: Int  
    Content: String  
    Questions: Question[]  

Question -  
    Id: Int  
    Type: "multiple", "single", "text"  
    Content: String  
    Answers: Answer[]  
    ShouldDisplay: ShouldDisplay[]  

ShouldDisplay -  
    AnswerId: Int  
    QuestionId: Int

Answer -
    Id: Int  
    Type: "check", "input", "photo"
    Content: String  
```

**Any question can depend on any previous answer using the "ShouldDisplay" property, but it is important to know that, this dependent question must be placed on the array just after the *last* question it depends from.**


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

**Before using the component, follow the installation steps of each dependecy first.**

## Example
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
