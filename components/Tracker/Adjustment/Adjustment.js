import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import AdjRow from './AdjRow';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  rowWrap: {
    flex: 1,
    backgroundColor: 'white'
  },
  championNameWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#eee',
  },
  championName: {
    fontWeight: 'bold'
  }
});

class Adjustment extends Component {
  render() {
    const adjRows = [];
    for (var i = 0; i < 5; i++) {
      adjRows.push(
        <View style={styles.rowWrap} key={i}>
          <View style={styles.championNameWrap}>
            <Text style={styles.championName}>
              {this.props.players[i].championName}
            </Text>
          </View>
          <AdjRow
            row = {i}
            spells = {this.props.players[i].spells}
            spellLevelUp = {this.props.spellLevelUp}
            spellLevelDown = {this.props.spellLevelDown}
            cooldownAdjust = {this.props.cooldownAdjust}
            ultimateCooldownAdjust = {this.props.ultimateCooldownAdjust}
          />
        </View>
      );
    }
    return (
      <View style={styles.main}>
        {adjRows}
      </View>
    );
  }
}

export default Adjustment;
