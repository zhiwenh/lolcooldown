import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  }
});

class CdLevelDown extends React.Component {
  onPress() {
    if (this.props.spells.ultimateCooldown - 5 >= 0) {
      if (this.props.spells.ultimateCooldown === 5) {
        this.props.ultimateCooldownAdjust(this.props.row, -5);
      } else {
        this.props.ultimateCooldownAdjust(this.props.row, -4);
      }
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
