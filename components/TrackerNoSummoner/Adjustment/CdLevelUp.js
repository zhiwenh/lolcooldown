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
    paddingLeft: 3,
    paddingRight: 3
  }
});

class CdLevelUp extends Component {
  onPress() {
    if (this.props.cooldown + 5 <= 45) {
      this.props.cooldownAdjust(this.props.row, 5);
    }
  }
  render() {
    return (
      <TouchableHighlight
        onPress = {this.onPress.bind(this)}
        style = {styles.main}
        underlayColor='#e6e6e6'
      >
        <Text style = {styles.text}>+ {this.props.cooldown}% CD</Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelUp;
