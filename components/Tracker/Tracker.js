import React, { Component } from 'react';
import Swiper from 'react-native-swiper';

import Adjustment from  './Adjustment/Adjustment.js';
import Spells from './Spells/Spells.js';
import SummonerSpells from './SummonerSpells/SummonerSpells.js';

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players
    };
    this.spellLevelUp = this.spellLevelUp.bind(this);
    this.spellLevelDown = this.spellLevelDown.bind(this);
    this.cooldownAdjust = this.cooldownAdjust.bind(this);
    this.ultimateCooldownAdjust = this.ultimateCooldownAdjust.bind(this);
  }

  spellLevelUp(row, col) {
    console.log('spellLeveUp');
    console.log('row: ' + row + ' col: ' + col);
    // use this to get the max level possible
    const data = this.state.players[row].spells.data1[col];
    const level = this.state.players[row].spells.levels[col];
    if (level < data.length) {
      const state = JSON.parse(JSON.stringify(this.state));
      state.players[row].spells.levels[col] = level + 1;
      state.players[row].level = state.players[row].level + 1;
      this.setState(state);
    }
  }

  spellLevelDown(row, col) {
    console.log('spellLeveDown');
    console.log('row: ' + row + ' col: ' + col);
    // use data to get the max level possible
    // const data = this.state.players[row].spells.data1[col];
    const level = this.state.players[row].spells.levels[col];
    if (level > 1) {
      const state = JSON.parse(JSON.stringify(this.state));
      state.players[row].spells.levels[col] = level - 1;
      state.players[row].level = state.players[row].level - 1;
      this.setState(state);
    }
  }

  cooldownAdjust(row, change) {
    const state = JSON.parse(JSON.stringify(this.state));
    // const levelChange = state.players[row].spells.cooldownPerLevel * state.players[row].level;
    state.players[row].spells.cooldown += change;
    this.setState(state);
  }

  ultimateCooldownAdjust(row, change) {
    const state = JSON.parse(JSON.stringify(this.state));
    state.players[row].spells.ultimateCooldown += change;
    this.setState(state);
  }

  render() {
    return (
      <Swiper showsPagination={false}>
        <Spells
          players = {this.state.players}
        />
        <SummonerSpells
          players = {this.state.players}
          summonersData = {this.props.summonersData}
        />
        <Adjustment
          players = {this.state.players}
          spellLevelUp = {this.spellLevelUp}
          spellLevelDown = {this.spellLevelDown}
          cooldownAdjust = {this.cooldownAdjust}
          ultimateCooldownAdjust = {this.ultimateCooldownAdjust}
        />
      </Swiper>
    );
  }

}

export default Tracker;
