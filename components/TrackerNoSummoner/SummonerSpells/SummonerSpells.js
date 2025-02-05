import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import SummonerRow from './SummonerRow';

const styles = StyleSheet.create({
  main: {
    flex: 1
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

class SummonerSpells extends Component {
  render() {
    const summonerRows = [];

    for (let i = 0; i < 5; i++) {
      summonerRows.push(
        <View style={styles.rowWrap} key={i}>
          <View style={styles.championNameWrap}>
            <Text style={styles.championName}>
              {this.props.players[i].championName}
            </Text>
          </View>
          <SummonerRow
            row = {i}
            page = {this.props.page}
            player = {this.props.players[i]}
            summonersData = {this.props.summonersData}
            cooldownAdjust = {this.cooldownAdjust}
            changeSummoners = {this.props.changeSummoners}
            summonerCooldownAdjust = {this.props.summonerCooldownAdjust}
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
        {summonerRows}
      </View>
    );
  }
}

export default SummonerSpells;
