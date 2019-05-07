import React from 'react';
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

class CdLevelUp extends React.Component {
  onPress() {
    if (this.props.cooldown + 5 <= 45) {
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
        <Text>+ {this.props.cooldown}</Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelUp;
