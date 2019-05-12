import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import UltimateLevelUp from './UltimateLevelUp';
import UltimateLevelDown from './UltimateLevelDown';
import UltimateCdUp from './UltimateCdUp';
import UltimateCdDown from './UltimateCdDown';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  levels: {
    flex: 1
  },
  cooldown: {
    flex: 1
  },
});

class UltimateAdjBox extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.levels}>
          <UltimateLevelUp
            row = {this.props.row}
            col = {this.props.col}
            skill = {this.props.skill}
            level = {this.props.level}
            spellLevelUp = {this.props.spellLevelUp}
          />
          <UltimateLevelDown
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
