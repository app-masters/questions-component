import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Styles, Button } from '@app-masters/react-native-ui-kit';

class QuestionView extends React.Component {

    render() {
        const { subheading, question, isPreviousEnabled, isNextEnabled } = this.props;

        return (
            <View style={[Styles.ph3, componentStyles.f1]}>
                <ScrollView>
                    <Text style={[componentStyles.centered, Styles.mt3]}>{subheading}</Text>
                    <Text style={[Styles.text.title(), Styles.mv4]}>{question.content}</Text>
                        {this.props.children(question.answers)}
                    <View style={[componentStyles.actions, Styles.mb4]}>
                        <Button
                            style={[
                                componentStyles.f1,
                                !isPreviousEnabled ? componentStyles.hidden : null
                            ]}
                            primaryColor={!isPreviousEnabled ? 'rgba(0,0,0, 0.1)' : null}
                            label={'Anterior'}
                            onPress={this.props.toPreviousQuestion} />
                        <Button
                            style={[
                                componentStyles.f1,
                                !isNextEnabled ? componentStyles.disabled : null
                            ]}
                            primaryColor={!isNextEnabled ? 'rgba(0,0,0, 0.1)' : null}
                            label={'Próxima'}
                            onPress={this.props.toNextQuestion} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    centered: {
        textAlign: 'center'
    },
    f1: {
        flexGrow: 1
    },
    actions: {
        display: 'flex',
        flexDirection: 'row'
    },
    disabled: {
        color: 'rgba(0, 0, 0, 0.1)'
    },
    hidden: {
        display: 'none'
    }
});

export default QuestionView;
