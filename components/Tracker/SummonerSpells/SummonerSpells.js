import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import SummonerRow from './SummonerRow';
import SortableList from 'react-native-sortable-list';

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

  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players
    };

    this.cooldownAdjust = this.cooldownAdjust.bind(this);
    this.changeSummoners = this.changeSummoners.bind(this);
  }

  cooldownAdjust(row, change) {
    const state = this.state;
    state.players[row].summonerSpells.cooldown += change;
    this.setState(state);
  }

  changeSummoners(row, col, change) {
    const state = this.state;
    if (col === 0) {
      state.players[row].summonerSpells.summonerSpell1.name =
        this.props.summonersData[change].name;
      state.players[row].summonerSpells.summonerSpell1.cooldown =
        this.props.summonersData[change].cooldown;
    } else {
      state.players[row].summonerSpells.summonerSpell2.name =
        this.props.summonersData[change].name;
      state.players[row].summonerSpells.summonerSpell2.cooldown =
        this.props.summonersData[change].cooldown;
    }
    this.setState(state);
  }

  render() {
    const summonerRows = [];
    const keys = Object.keys(this.props.players);
    for (let i = 0; i < keys.length; i++) {
      summonerRows.push(
        <View style={styles.rowWrap} key={i}>
          <View style={styles.championNameWrap}>
            <Text style={styles.championName}>
              {this.props.players[i].championName}
            </Text>
          </View>
          <SummonerRow
            row = {i}
            player = {this.props.players[i]}
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
