import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingLeft: 3,
    paddingRight: 3
  }
});

class CdLevelDown extends React.Component {
  onPress() {
    if (this.props.cooldown - 5 >= 0) {
      console.log(this.props.row);
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
        <Text>-</Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelDown;
