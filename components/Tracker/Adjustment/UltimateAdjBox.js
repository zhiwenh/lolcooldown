import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import LevelUp from './LevelUp';
import LevelDown from './LevelDown';
import UltimateCdUp from './UltimateCdUp';
import UltimateCdDown from './UltimateCdDown';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'column'
  },
  levels: {
    flex: 1
  },
  cooldown: {
    flex: 1
  }
});

class UltimateAdjBox extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.levels}>
          <LevelUp
            row = {this.props.row}
            col = {this.props.col}
            level = {this.props.level}
            spellLevelUp = {this.props.spellLevelUp}
          />
          <LevelDown
            row = {this.props.row}
            col = {this.props.col}
            level = {this.props.level}
            spellLevelDown = {this.props.spellLevelDown}
          />
        </View>
        <View style={styles.cooldown}>
          <UltimateCdUp
            row = {this.props.row}
            col = {this.props.col}
            spells = {this.props.spells}
            ultimateCooldownAdjust = {this.props.ultimateCooldownAdjust}
          />
          <UltimateCdDown
            row = {this.props.row}
            col = {this.props.col}
            spells = {this.props.spells}
            ultimateCooldownAdjust = {this.props.ultimateCooldownAdjust}
          />
        </View>
      </View>
    );
  }
}

export default UltimateAdjBox;
