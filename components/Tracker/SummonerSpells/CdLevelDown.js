import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
});

class CdLevelDown extends Component {
  onPress() {
    if (this.props.player.summonerSpells.cooldown - 5 >= 0) {
      this.props.cooldownAdjust(this.props.row, -5);
    }
  }
  render() {
    return (
      <TouchableHighlight
        onPress = {this.onPress.bind(this)}
        style = {styles.main}
        underlayColor='#e6e6e6'
      >
        <Text> -</Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelDown;
