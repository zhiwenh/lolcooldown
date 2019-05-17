import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

import AdjBox from './AdjBox';
import CdBox from './CdBox';
import UltimateCdBox from './UltimateCdBox';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 1
  },
  iconWrap: {
    borderWidth: 1
  }
});

class AdjRow extends Component {
  render() {
    const adjBoxes = [];
    for (var i = 0; i < 4; i++) {
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
      } else if (i === 3) {
        adjBoxes.push(<AdjBox
          key = {i}
          col = {i}
          row = {this.props.row}
          skill = 'R'
          level = {this.props.spells.levels[i]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
        />);
      }
    }

    return (
      <View style={styles.main}>
        <View style={styles.iconWrap}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: this.props.player.championIconUrl}}
          />
        </View>
        {adjBoxes}
        <UltimateCdBox
          row = {this.props.row}
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
