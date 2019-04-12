
import React, {Component} from 'react';
import { startStyles } from '@app-masters/react-native-ui-kit';
import Example from './src/views/example/example';
import AppStyles from './src/styles/appStyles'

export default class App extends Component {

  constructor(props) {
    super(props);

    // Start AppStyles
    startStyles(AppStyles, null);
  }

  render() {
    return (
      <Example />
    );
  }
}
