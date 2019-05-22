import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 3,
    paddingRight: 3
  }
});

class LevelDown extends Component {
  onPress() {
    this.props.spellLevelDown(this.props.row, this.props.col);
  }
  render() {
    return (
      <TouchableHighlight
        onPress = {this.onPress.bind(this)}
        style = {styles.main}
        underlayColor='#e6e6e6'
      >
        <Text>-</Text>
      </TouchableHighlight>
    );
  }
}

export default LevelDown;