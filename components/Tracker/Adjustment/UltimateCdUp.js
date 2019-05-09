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

class CdLevelDown extends React.Component {
  onPress() {
    if (this.props.spells.ultimateCooldown + 4 <= 25) {
      if (this.props.spells.ultimateCooldown === 0) {
        this.props.ultimateCooldownAdjust(this.props.row, 5);
      } else {
        this.props.ultimateCooldownAdjust(this.props.row, 4);
      }
    }
  }
  render() {
    return (
      <TouchableHighlight
        onPress = {this.onPress.bind(this)}
        style = {styles.main}
      >
        <Text> + {this.props.spells.ultimateCooldown}% CD</Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelDown;
