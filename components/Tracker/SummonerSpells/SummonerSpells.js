import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import SummonerRow from './SummonerRow';

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

class SummonerSpells extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players
    };

    this.cooldownAdjust = this.cooldownAdjust.bind(this);
    this.changeSummoners = this.changeSummoners.bind(this);
  }

  cooldownAdjust(row, change) {
    const state = JSON.parse(JSON.stringify(this.state));
    state.players[row].summonerSpells.cooldown += change;
    this.setState(state);
  }

  changeSummoners(row, col, change) {
    const state = JSON.parse(JSON.stringify(this.state));
    if (col === 0) {
      state.players[row].summonerSpells.summonerSpell1.name =
        this.props.summonerData[change].name;
      state.players[row].summonerSpells.summonerSpell1.cooldown =
        this.props.summonerData[change].cooldown;
    } else {
      state.players[row].summonerSpells.summonerSpell2.name =
        this.props.summonerData[change].name;
      state.players[row].summonerSpells.summonerSpell2.cooldown =
        this.props.summonerData[change].cooldown;
    }
    this.setState(state);
  }

  render() {
    const summonerRows = [];
    for (let i = 0; i < 5; i++) {
      summonerRows.push(
        <View style={styles.main} key={i}>
          <View style={styles.championName}>
            <Text>{this.props.players[i].championName}</Text>
          </View>
          <SummonerRow
            key = {i}
            row = {i}
            player = {this.state.players[i]}
            summonersData = {this.props.summonersData}
            cooldownAdjust = {this.cooldownAdjust}
            changeSummoners = {this.changeSummoners}
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
