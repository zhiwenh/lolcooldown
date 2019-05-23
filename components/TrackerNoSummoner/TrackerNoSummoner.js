import React, { Component } from 'react';
import { Alert, Platform, BackHandler, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import KeepAwake from 'react-native-keep-awake';
import { Actions } from 'react-native-router-flux';
import BackgroundTimer from 'react-native-background-timer'

import Adjustment from  './Adjustment/Adjustment.js';
import Spells from './Spells/Spells.js';
import SummonerSpells from './SummonerSpells/SummonerSpells.js';

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players,
      selectedChampion: [false, false, false, false, false],
      resetTimers: {
        spells: [
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false]
        ],
        summoners: [
          [false, false],
          [false, false],
          [false, false],
          [false, false],
          [false, false]
        ]
      }
    };

    this.handleBackPress = this.handleBackPress.bind(this);
    this.spellLevelUp = this.spellLevelUp.bind(this);
    this.spellLevelDown = this.spellLevelDown.bind(this);
    this.cooldownAdjust = this.cooldownAdjust.bind(this);
    this.ultimateCooldownAdjust = this.ultimateCooldownAdjust.bind(this);
    this.summonerCooldownAdjust = this.summonerCooldownAdjust.bind(this);
    this.selectChampion = this.selectChampion.bind(this);
    this.changeSummoners = this.changeSummoners.bind(this);
    this.changeResetTimer = this.changeResetTimer.bind(this);
  }

  handleBackPress() {
    Alert.alert(
      'Confirm back',
      'Are you sure you want to go back?',
      [
        {text: 'CANCEL', style: 'cancel'},
        {text: 'OK', onPress: () => Actions.pop()}
      ]
    );
    return true;
  }

  componentDidMount() {
    if (Platform.OS === 'ios') BackgroundTimer.start();
    KeepAwake.activate();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') BackgroundTimer.stop();
    KeepAwake.deactivate();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  spellLevelUp(row, col) {
    const data = this.state.players[row].spells.data[col];
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
    if (state.players[row].championName === '-') return;
    state.players[row].spells.cooldown += change;
    this.setState(state);
  }

  ultimateCooldownAdjust(row, change) {
    const state = this.state;
    if (state.players[row].championName === '-') return;
    state.players[row].spells.ultimateCooldown += change;
    this.setState(state);
  }

  summonerCooldownAdjust(row, change) {
    const state = this.state;
    state.players[row].summonerSpells.cooldown += change;
    this.setState(state);
  }

  changeSummoners(row, col, change) {
    const summonerIconUrl = 'http://ddragon.leagueoflegends.com/cdn/' + this.props.version + '/img/spell/'

    const state = this.state;
    if (col === 0) {
      state.players[row].summonerSpells.summonerSpell1.name =
        this.props.summonersData[change].name;
      state.players[row].summonerSpells.summonerSpell1.cooldown =
        this.props.summonersData[change].cooldown;
      state.players[row].summonerSpells.summonerSpell1.summonerIconUrl =
        summonerIconUrl + this.props.summonersData[change].image.full;
    } else {
      state.players[row].summonerSpells.summonerSpell2.name =
        this.props.summonersData[change].name;
      state.players[row].summonerSpells.summonerSpell2.cooldown =
        this.props.summonersData[change].cooldown;
      state.players[row].summonerSpells.summonerSpell2.summonerIconUrl =
        summonerIconUrl + this.props.summonersData[change].image.full;
    }
    this.setState(state);
  }

  selectChampion(row, championId) {
    const iconUrl = 'http://ddragon.leagueoflegends.com/cdn/' + this.props.version + '/img/champion/';
    const champs = this.props.champsData;
    const state = JSON.parse(JSON.stringify(this.state));

    if (state.selectedChampion[row] !== false) {
      for (let i = 0; i < state.resetTimers.spells[row].length; i++) {
        state.resetTimers.spells[row][i] = true;
      }

      for (let i = 0; i < state.resetTimers.summoners[row].length; i++) {
        state.resetTimers.summoners[row][i] = true;
      }
    }

    state.selectedChampion[row] = true;
    state.players[row].championName = champs[championId].name;
    state.players[row].championId = championId;
    state.players[row].championIconUrl = iconUrl + champs[championId].image.full;
    Image.prefetch(state.players[row].championIconUrl);

    state.players[row].summonerSpells.cooldown = 0;

    champs[championId].spells.forEach((spell, index) => {
      state.players[row].spellNames.data[index] = spell.name;
      state.players[row].spells.data[index] = spell.cooldown;
    });

    state.players[row].spells.cooldown = 0;
    state.players[row].spells.ultimateCooldown = 0;
    for (let key in state.players[row].spells.levels) {
      state.players[row].spells.levels[key] = 1;
    }

    console.log(state);
    this.setState(state);
  }

  changeResetTimer(page, row, col) {
    const state = JSON.parse(JSON.stringify(this.state));
    state.resetTimers[page][row][col] = false;
    this.setState(state);
  }

  render() {
    return (
      <ScrollableTabView
        initialPage = {1}
        tabBarBackgroundColor = '#808080'
        tabBarActiveTextColor = 'white'
        tabBarInactiveTextColor = 'white'
      >
        <Adjustment
          tabLabel = 'Levels and CD'
          players = {this.state.players}
          spellLevelUp = {this.spellLevelUp}
          spellLevelDown = {this.spellLevelDown}
          cooldownAdjust = {this.cooldownAdjust}
          ultimateCooldownAdjust = {this.ultimateCooldownAdjust}
          selectChampion = {this.selectChampion}
          champsData = {this.props.champsData}
          selectedChampion = {this.state.selectedChampion}
        />
        <Spells
          tabLabel = 'Abilities'
          players = {this.state.players}
          selectChampion = {this.selectChampion}
          champsData = {this.props.champsData}
          selectedChampion = {this.state.selectedChampion}
          resetTimers = {this.state.resetTimers.spells}
          changeResetTimer = {this.changeResetTimer}
          page = 'spells'
        />
        <SummonerSpells
          tabLabel = 'Summoners'
          players = {this.state.players}
          summonersData = {this.props.summonersData}
          version = {this.props.version}
          selectChampion = {this.selectChampion}
          champsData = {this.props.champsData}
          selectedChampion = {this.state.selectedChampion}
          changeSummoners = {this.changeSummoners}
          summonerCooldownAdjust = {this.summonerCooldownAdjust}
          resetTimers = {this.state.resetTimers.summoners}
          changeResetTimer = {this.changeResetTimer}
          page = 'summoners'
        />
      </ScrollableTabView>
    );
  }

  // <Swiper
  //   autoplay={false}
  //   loop={false}
  //   index={1}
  //   activeDotColor='red'
  //   activeDotStyle={{opacity: 0.2}}
  // >
}

export default Tracker;
