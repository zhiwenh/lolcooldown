import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderBottomWidth: 0.5
  }
});

class CdLevelUp extends Component {
  onPress() {
    if (this.props.player.summonerSpells.cooldown + 5 <= 5) {
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
        <Text> + {this.props.player.summonerSpells.cooldown}% CD</Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelUp;
