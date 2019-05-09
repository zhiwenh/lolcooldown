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

class LevelDown extends React.Component {
  onPress() {
    this.props.spellLevelDown(this.props.row, this.props.col);
  }
  render() {
    return (
      <TouchableHighlight
        onPress = {this.onPress.bind(this)}
        style = {styles.main}
      >
        <Text> -</Text>
      </TouchableHighlight>
    );
  }
}

export default LevelDown;
