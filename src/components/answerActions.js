import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import cropPicker from 'react-native-image-crop-picker';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;
const options = ['Cancelar', 'Selecionar da galeria', 'Tirar uma foto'];

class AnswerActions extends React.Component {
    constructor (props) {
        super(props);

        this.onPress = this.onPress.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.selectPhoto = this.selectPhoto.bind(this);
        this.onActionSheetPress = this.onActionSheetPress.bind(this);
    }

    renderAnswer () {
        const { answer, answerView, selected, value } = this.props;

        return React.createElement(answerView, {
            selected,
            value,
            answer,
            onPress: this.onPress,
            onChangeText: this.onChangeText,
            selectPhoto: this.selectPhoto
        });
    }

    render () {
        return (
            <React.Fragment>
                {this.renderAnswer()}
                <ActionSheet
                    ref={o => { this.ActionSheetPhoto = o; }}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.onActionSheetPress} />
            </React.Fragment>
        );
    }

    onPress () {
        if (this.props.onPress) {
            this.props.onPress(this.props.answer);
        }
    }

    onChangeText (text) {
        if (this.props.onChangeText) {
            this.props.onChangeText(text, this.props.answer);
        }
    }

    onPhotoSelected(image) {
        if (this.props.onPhotoSelected) {
            this.props.onPhotoSelected(image, this.props.answer);
        }
    }

    selectPhoto() {
        if (this.ActionSheetPhoto && this.ActionSheetPhoto.show) {
            if (!this.props.selected) {
                this.ActionSheetPhoto.show();
            } else {
                this.props.onPhotoSelected(undefined, this.props.answer);
            }
        }
    }

    onActionSheetPress(index) {
        const props = {
            cropping: true,
            height: 600,
            width: 600,
            includeBase64: true
        };

        if (index === 1) {
            cropPicker
            .openPicker(props)
            .then(image => {
                this.onPhotoSelected(image);
            });
        } else if (index === 2) {
            cropPicker
            .openCamera(props)
            .then(image => {
                this.onPhotoSelected(image);
            });
        }
    }
}

export default AnswerActions;
