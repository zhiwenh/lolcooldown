import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderBottomWidth: 0.5,
    backgroundColor: 'white'
  },
  text: {

  }
});

class LevelUp extends React.Component {
  onPress() {
    this.props.spellLevelUp(this.props.row, this.props.col);
  }
  render() {
    return (
      <TouchableHighlight
        style = {styles.main}
        onPress = {this.onPress.bind(this)}
        underlayColor='#e6e6e6'
      >
        <Text style = {styles.text}> + {this.props.skill} Lv {this.props.level}</Text>
      </TouchableHighlight>
    );
  }
}

export default LevelUp;
