import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import AdjBox from './AdjBox';
import CdBox from './CdBox';
import UltimateAdjBox from './UltimateAdjBox';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

class AdjRow extends Component {
  render() {
    const adjBoxes = [];
    for (var i = 0; i < 3; i++) {
      if (i === 0) {
        adjBoxes.push(<AdjBox
          key = {i}
          col = {i}
          row = {this.props.row}
          skill = 'Q'
          level = {this.props.spells.levels[i]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
        />);
      } else if (i === 1) {
        adjBoxes.push(<AdjBox
          key = {i}
          col = {i}
          row = {this.props.row}
          skill = 'W'
          level = {this.props.spells.levels[i]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
        />);
      } else if (i === 2) {
        adjBoxes.push(<AdjBox
          key = {i}
          col = {i}
          row = {this.props.row}
          skill = 'E'
          level = {this.props.spells.levels[i]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
        />);
      }
    }
    return (
      <View style={styles.main}>
        {adjBoxes}
        <UltimateAdjBox
          key = {i}
          col = {3}
          row = {this.props.row}
          skill = 'R'
          level = {this.props.spells.levels[3]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
          spells = {this.props.spells}
          ultimateCooldownAdjust = {this.props.ultimateCooldownAdjust}
        />
        <CdBox
          row = {this.props.row}
          cooldown = {this.props.spells.cooldown}
          cooldownAdjust = {this.props.cooldownAdjust}
        />
      </View>
    );
  }
}

export default AdjRow;
