import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import SpellRow from './SpellRow';

// props: players
// prop methods: startSpellTimer, stopSpellTimer

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
    fontWeight: 'bold',
    borderWidth: 1,
    backgroundColor: '#595959',
  },
  championName: {
    fontWeight: 'bold',
    color: 'white'
  }
});

class Spells extends Component {
  render() {
    const spellRows = [];
    for (var i = 0; i < 5; i++) {
      spellRows.push(
        <View style={styles.rowWrap} key={i}>
          <View style={styles.championNameWrap}>
            <Text style={styles.championName}>
              {this.props.players[i].championName}
            </Text>
          </View>
          <SpellRow
            row = {i}
            page = {this.props.page}
            name = {this.props.userSummonerName} // I dont think this is being used
            spells = {this.props.players[i].spells}
            spellNames = {this.props.players[i].spellNames}
            spellIconUrls = {this.props.players[i].spellIconUrls}
            player = {this.props.players[i]}
            selectChampion = {this.props.selectChampion}
            champsData = {this.props.champsData}
            selectedChampion = {this.props.selectedChampion[i]}
            resetTimers = {this.props.resetTimers[i]}
            changeResetTimer = {this.props.changeResetTimer}
          />
        </View>
      );
    }
    return (
      <View style={styles.main}>
        {spellRows}
      </View>
    );
  }
}

export default Spells;
