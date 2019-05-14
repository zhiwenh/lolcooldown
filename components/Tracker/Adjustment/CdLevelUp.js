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
        underlayColor='#e6e6e6'
      >
        <Text> + {this.props.cooldown}% CD</Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelUp;
