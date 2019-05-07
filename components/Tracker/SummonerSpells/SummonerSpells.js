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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

class SummonerSpells extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players
    };

    this.cooldownAdjust = this.cooldownAdjust.bind(this);
  }

  cooldownAdjust(row, change) {
    console.log(typeof change);
    const state = JSON.parse(JSON.stringify(this.state));

    state.players[row].summonerSpells.cooldown += change;
    this.setState(state);
  }

  render() {
    const summonerRows = [];
    for (let i = 0; i < 5; i++) {
      summonerRows.push(<SummonerRow
        key = {i}
        row = {i}
        player = {this.state.players[i]}
        cooldownAdjust = {this.cooldownAdjust}
      />);
    }

    return (
      <View style={styles.main}>
        {summonerRows}
      </View>
    );
  }
}

export default SummonerSpells;
