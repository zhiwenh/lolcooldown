import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 3,
    paddingRight: 3
  },
  text: {

  }
});

class LevelUp extends Component {
  onPress() {
    this.props.spellLevelUp(this.props.row, this.props.col);
  }
  render() {
    return (
      <TouchableHighlight
        style = {styles.main}
        onPress = {this.onPress.bind(this)}
        underlayColor='#e6e6e6'
      >
        <Text style = {styles.text}>+ {this.props.skill} {this.props.level}</Text>
      </TouchableHighlight>
    );
  }
}

export default LevelUp;
