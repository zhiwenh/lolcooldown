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
    borderWidth: 1,
    backgroundColor: '#999999',
  },
  championName: {
    fontWeight: 'bold',
    color: 'white'
  }
});

class Adjustment extends Component {
  render() {
    const adjRows = [];
    const keys = Object.keys(this.props.players);
    for (var i = 0; i < keys.length; i++) {
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
            player = {this.props.players[i]}
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
