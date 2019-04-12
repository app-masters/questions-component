import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Styles } from '@app-masters/react-native-ui-kit';

class AnswerCheckView extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <TouchableOpacity
                style={[
                    Styles.p3,
                    Styles.mb2,
                    componentStyles.answer,
                    this.props.selected ? componentStyles.selected : null
                ]}
                onPress={this.props.onPress}>
                <Text>{this.props.answer.content}</Text>
            </TouchableOpacity>
        );
    }
}

const componentStyles = StyleSheet.create({
    answer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5
    },
    selected: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});

export default AnswerCheckView;
