import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import LevelUp from './LevelUp';
import LevelDown from './LevelDown';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    borderLeftWidth: 1
  }
});

class AdjBox extends Component {
  render() {
    return (
      <View style={styles.main}>
        <LevelUp
          row = {this.props.row}
          col = {this.props.col}
          skill = {this.props.skill}
          level = {this.props.level}
          spellLevelUp = {this.props.spellLevelUp}
        />
        <LevelDown
          row = {this.props.row}
          col = {this.props.col}
          spellLevelDown = {this.props.spellLevelDown}
        />
      </View>
    );
  }
}

export default AdjBox;
