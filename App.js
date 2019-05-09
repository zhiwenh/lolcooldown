/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import promisify from 'es6-promisify';
import { Router, Scene, Actions } from 'react-native-router-flux';

import InputSummoner from './components/InputSummoner/InputSummoner.js';
import Loading from './components/Loading/Loading.js';
import Tracker from './components/Tracker/Tracker.js';

const API_KEY = require('./API_KEY.json').key;
const VERSION = '9.9.1';

class App extends Component {

  constructor(props) {
    super(props);
    const state = {};
    state.players = {};
    for (let i = 0; i < 5; i++) {
      const playerSchema = this.generatePlayerSchema();
      state.players[i] = playerSchema;
    }
    state.userSummonerName = null;
    state.gameRequestSuccess = null;
    state.champsData = null;
    state.runesData = null;
    state.summonersData = null;
    state.region = 'NA1';
    state.loading = true;
    state.error;

    this.state = state;

    this.getChampionStaticData = this.getChampionStaticData.bind(this);
    this.getSummonerStaticData = this.getSummonerStaticData.bind(this);
    this.generatePlayerSchema = this.generatePlayerSchema.bind(this);
    this.requestPlayerGame = this.requestPlayerGame.bind(this);

    this.loadingSummoner = true;
    this.loadingChampion = true;
  }

  componentDidMount() {
    this.getChampionStaticData();
    this.getSummonerStaticData();
  }

  getSummonerStaticData() {
    const summonerUrl = 'http://ddragon.leagueoflegends.com/cdn/' + VERSION +
      '/data/en_US/summoner.json';

    fetch(summonerUrl, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        const summonerObj = {};
        for (let summoner in res.data) {
          summonerObj[res.data[summoner].key] = res.data[summoner];
        }

        console.log(summonerObj);
        this.state.summonersData = summonerObj;
        this.loadingSummoner = false;

        if (this.loadingSummoner === false && this.loadingChampion === false) {
          const state = this.state;
          state.loading = false;
          this.setState(state);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getChampionStaticData() {
    const championUrl = 'http://ddragon.leagueoflegends.com/cdn/' + VERSION +
      '/data/en_US/champion.json';
    const individualChampionUrlPrefix =
      'http://ddragon.leagueoflegends.com/cdn/' + VERSION + '/data/en_US/champion/';

    fetch(championUrl, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        const champs = [];
        for (let champData in res.data) {
          champs.push(res.data[champData].id);
        }

        const promises = [];
        const individualChampionUrls = [];
        champs.forEach(champ => {
          const individualChampionUrl = individualChampionUrlPrefix + champ + '.json';
          promises.push(fetch(individualChampionUrl, {method: 'GET'}));
          individualChampionUrls.push(individualChampionUrl);
        });
        // console.log(individualChampionUrls)
        return Promise.all(promises);
      })
      .then(resArr => {
        const promises = [];

        resArr.forEach(res => {
          promises.push(res.json())
        });

        return Promise.all(promises);
      })
      .then(resArr => {
        resArr = resArr.map(res => {
          for (let champion in res.data) {
            return res.data[champion];
          }
        });

        const championDataObj = {};
        resArr.forEach(res => {
          championDataObj[res.key] = res;
        });

        this.state.champsData = championDataObj;

        this.loadingChampion = false;

        if (this.loadingSummoner === false && this.loadingChampion === false) {
          console.log('here');
          const state = this.state;
          state.loading = false;
          console.log(state);
          this.setState(state);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  generatePlayerSchema() {
    const playerSchema = {
      playerName: null,
      playerId: null,
      championName: null,
      championId: null,
      spells: {
        cooldown: 0,
        ultimateCooldown: 0,
        cooldownPerLevel: 0,
        levels: {
          '0': 1, '1': 1, '2': 1, '3': 1, '4': 1
        },
        // all 0 as a work around for Spell.js not being able to read null
        data1: {
          '0': 0, '1': 0, '2': 0, '3': 0, '4': 0
        },
        data2: {
          '0': 0, '1': 0, '2': 0, '3': 0, '4': 0
        },
        // data1: [null, null, null, null, null],
        // data2: [null, null, null, null, null],
        data3: [null, null, null, null, null]
      },
      spellNames: {
        data1: {
          '0': null, '1': null, '2': null, '3': null, '4': null
        },
        data2: {
          '0': null, '1': null, '2': null, '3': null, '4': null
        }
      },
      summonerSpells: {
        cooldown: 0,
        summonerSpell1: {
          name: null,
          cooldown: null
        },
        summonerSpell2: {
          name: null,
          cooldown: null
        }
      },
      championIcon: null,
      spellIcons: {
        data1: {
          '0': null, '1': null, '2': null, '3': null, '4': null
        },
        data2: {
          '0': null, '1': null, '2': null, '3': null, '4': null
        }
      },
      level: 1,
    };
    return playerSchema;
  }

  requestPlayerGame(summonerName, region) {
    summonerName = summonerName.toLowerCase().replace(/ /g,'%20');
    const key = '?api_key=' + API_KEY;
    const idUrl = 'https://' + region +
      '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
      summonerName + key;
    console.log(idUrl);
    fetch(idUrl, {method: 'GET'})
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.id === undefined) {
          this.setState({
            error: 'Summoner not found',
            region: region
          });
          return;
        }
        const summonerId = res.id;
        const currentGameUrl = 'https://' + region +
          '.api.riotgames.com/lol/spectator/v4/' +
          'active-games/by-summoner/' + summonerId + key;
        console.log(currentGameUrl);
        return fetch(currentGameUrl);
      })
      .then(res => res.json())
      .then(res => {
        const champs = this.state.champsData;
        const summoners = this.state.summonersData;
        const players = {};
        console.log(res);
        if (res.gameId === undefined) {
          this.setState({
            error: 'Summoner not in game',
            region: region
          });
          return;
          return;
        };
        let index = 0;
        for (let i = 0; i < res.participants.length; i++) {
          const participant = res.participants[i];
          if (participant.teamId === 200) {
            const playerSchema = this.generatePlayerSchema();
            playerSchema.playerName = participant.summonerName;
            playerSchema.championName = champs[participant.championId].name;

            const summonerSpell1 = summoners[participant.spell1Id];
            playerSchema.summonerSpells.summonerSpell1.name = summonerSpell1.name;
            playerSchema.summonerSpells.summonerSpell1.cooldown = summonerSpell1.cooldown[0];

            const summonerSpell2 = summoners[participant.spell2Id];
            playerSchema.summonerSpells.summonerSpell2.name = summonerSpell2.name;
            playerSchema.summonerSpells.summonerSpell2.cooldown = summonerSpell2.cooldown[0];

            champs[participant.championId].spells.forEach((spell, index2) => {
              playerSchema.spellNames.data1[index2] = spell.name;
              playerSchema.spells.data1[index2] = spell.cooldown;
              playerSchema.spellIcons.data1[index2] = spell.image.full;
            });
            players[index] = playerSchema;
            index++;
          }
        }
        console.log('players', players);
        Actions.tracker({
          players: players,
          summonersData: summoners
        });

      }).catch((err) => {
        console.log(err);
      });
  }

  render() {

    if (this.state.loading === true) {
      return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      )
    }

    return (
      <Router>
        <Scene key="root">
          <Scene
            key="inputSummoner"
            component={InputSummoner}
            requestPlayerGame={this.requestPlayerGame}
            hideNavBar={true}
            error={this.state.error}
            region={this.state.region}
          />
          <Scene key="tracker"
            component={Tracker}
            headerMode={false}
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default App;
