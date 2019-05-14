import React, { Component } from 'react';
import Swiper from 'react-native-swiper';

import Adjustment from  './Adjustment/Adjustment.js';
import Spells from './Spells/Spells.js';
import SummonerSpells from './SummonerSpells/SummonerSpells.js';
import Sort from './Sort/Sort.js';

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players,
      sort: true
    };

    this.spellLevelUp = this.spellLevelUp.bind(this);
    this.spellLevelDown = this.spellLevelDown.bind(this);
    this.cooldownAdjust = this.cooldownAdjust.bind(this);
    this.ultimateCooldownAdjust = this.ultimateCooldownAdjust.bind(this);
    this.finishSort = this.finishSort.bind(this);
    this.changeRows = this.changeRows.bind(this);
  }

  finishSort() {
    this.setState({
      sort: false
    })
  }

  spellLevelUp(row, col) {
    const data = this.state.players[row].spells.data1[col];
    const level = this.state.players[row].spells.levels[col];
    if (level < data.length) {
      const state = this.state;
      state.players[row].spells.levels[col] = level + 1;
      state.players[row].level = state.players[row].level + 1;
      this.setState(state);
    }
  }

  spellLevelDown(row, col) {
    const level = this.state.players[row].spells.levels[col];
    if (level > 1) {
      const state = this.state;
      state.players[row].spells.levels[col] = level - 1;
      state.players[row].level = state.players[row].level - 1;
      this.setState(state);
    }
  }

  cooldownAdjust(row, change) {
    const state = this.state;
    state.players[row].spells.cooldown += change;
    this.setState(state);
  }

  ultimateCooldownAdjust(row, change) {
    const state = this.state;
    state.players[row].spells.ultimateCooldown += change;
    this.setState(state);
  }

  changeRows(players) {
    console.log('old players', this.state.players);
    console.log('new players', players);
    const state = this.state;
    state.players = players;
    this.setState(state);
  }

  render() {
    if (this.state.sort === true) {
      return (
        <Sort
          finishSort = {this.finishSort}
          players = {this.state.players}
          changeRows = {this.changeRows}
        />
      )
    }

    return (
      <Swiper
        autoplay={false}
        loop={false}
        index={1}
        activeDotColor='red'
      >
        <Adjustment
          players = {this.state.players}
          spellLevelUp = {this.spellLevelUp}
          spellLevelDown = {this.spellLevelDown}
          cooldownAdjust = {this.cooldownAdjust}
          ultimateCooldownAdjust = {this.ultimateCooldownAdjust}
        />
        <Spells
          players = {this.state.players}
        />
        <SummonerSpells
          players = {this.state.players}
          summonersData = {this.props.summonersData}
        />
      </Swiper>
    );
  }

}

export default Tracker;
