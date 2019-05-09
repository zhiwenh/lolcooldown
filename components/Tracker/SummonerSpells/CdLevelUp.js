import React from 'react';
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

class CdLevelUp extends React.Component {
  onPress() {
    if (this.props.player.summonerSpells.cooldown + 5 <= 5) {
      console.log(this.props.row);
      this.props.cooldownAdjust(this.props.row, 5);
    }
  }
  render() {
    return (
      <TouchableHighlight
        onPress = {this.onPress.bind(this)}
        style = {styles.main}
      >
        <Text> + {this.props.player.summonerSpells.cooldown}% CD</Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelUp;
