import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Styles } from '@app-masters/react-native-ui-kit';

class AnswerTextView extends React.Component {
    render() {
        return (
            <View>
                <TextInput
                    multiline
                    style={[
                        Styles.p3,
                        Styles.mb2,
                        componentStyles.input,
                        this.props.value ? componentStyles.filled : null
                    ]}
                    value={this.props.value}
                    numberOfLines={50}
                    placeholder={this.props.answer.content}
                    onChangeText={this.props.onChangeText} />
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
        height: 200,
        textAlignVertical: 'top'
    },
    filled: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});

export default AnswerTextView;
