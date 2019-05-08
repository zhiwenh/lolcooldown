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
    backgroundColor: '#F5FCFF'
  },
  championName: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Adjustment extends Component {
  render() {
    const adjRows = [];
    for (var i = 0; i < 5; i++) {
      adjRows.push(
        <View style={styles.main}>
          <View style={styles.championName}>
            <Text>{this.props.players[i].championName}</Text>
          </View>
          <AdjRow
            key = {i}
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
