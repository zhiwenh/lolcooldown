import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import AdjBox from './AdjBox';
import CdBox from './CdBox';

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
    for (var i = 0; i < 4; i++) {
      adjBoxes.push(<AdjBox
        key = {i}
        col = {i}
        row = {this.props.row}
        level = {this.props.spells.levels[i]}
        spellLevelUp = {this.props.spellLevelUp}
        spellLevelDown = {this.props.spellLevelDown}
      />);
    }
    return (
      <View style={styles.main}>
        {adjBoxes}
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
