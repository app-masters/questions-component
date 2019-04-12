import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Styles } from '@app-masters/react-native-ui-kit';
import {
    camera,
    trash
} from './../../images/images';

class AnswerPhotoView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={[
                    Styles.p3,
                    Styles.mb2,
                    componentStyles.answer,
                    this.props.selected ? componentStyles.selected : null
                ]}
                onPress={this.props.selectPhoto}>
                <Text>{this.props.selected ? 'Remover foto' : this.props.answer.content}</Text>
                <Image
                    style={[componentStyles.icon]}
                    source={this.props.selected ? trash : camera} />
            </TouchableOpacity>
        );
    }
}

const componentStyles = StyleSheet.create({
    answer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    icon: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        tintColor: 'rgba(0,0,0,0.5)',
    }
});

export default AnswerPhotoView;
