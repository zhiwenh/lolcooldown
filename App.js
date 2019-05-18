import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, BackHandler} from 'react-native';
import Swiper from 'react-native-swiper';
import { Router, Scene, Actions } from 'react-native-router-flux';

import InputSummoner from './components/InputSummoner/InputSummoner.js';
import Tracker from './components/Tracker/Tracker.js';

const VERSION_NUMBER_URL = 'https://us-central1-league-cooldown.cloudfunctions.net/getVersionNumber';
const SUMMONER_URL = 'https://us-central1-league-cooldown.cloudfunctions.net/getSummoner';
const GAME_URL = 'https://us-central1-league-cooldown.cloudfunctions.net/getCurrentGame';

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
    state.error;
    state.spinner = true;

    this.state = state;

    this.summonersData = null;
    this.champsData = null;
    this.loadingSummoner = true;
    this.loadingChampion = true;
    this.version = null;

    this.getStaticData = this.getStaticData.bind(this);
    this.getChampionStaticData = this.getChampionStaticData.bind(this);
    this.getSummonerStaticData = this.getSummonerStaticData.bind(this);
    this.generatePlayerSchema = this.generatePlayerSchema.bind(this);
    this.requestPlayerGame = this.requestPlayerGame.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
    this.getStaticData();
  }

  getStaticData() {
    fetch(VERSION_NUMBER_URL, {method: 'GET'})
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.version = res;
        this.getSummonerStaticData();
        this.getChampionStaticData();
      })
      .catch(err => {
        console.log(err);
      })
  }

  getSummonerStaticData() {
    const summonerUrl = 'http://ddragon.leagueoflegends.com/cdn/' + this.version +
      '/data/en_US/summoner.json';

    fetch(summonerUrl, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        const summonerObj = {};
        for (let summoner in res.data) {
          summonerObj[res.data[summoner].key] = res.data[summoner];
        }

        this.summonersData = summonerObj;
        this.loadingSummoner = false;

        console.log(summonerObj);

        if (this.loadingSummoner === false && this.loadingChampion === false) {
          this.setState({
            spinner: false,
            champsData: this.champsData,
            summonersData: this.summonersData
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getChampionStaticData() {
    const championUrl = 'http://ddragon.leagueoflegends.com/cdn/' + this.version +
      '/data/en_US/champion.json';
    const individualChampionUrlPrefix =
      'http://ddragon.leagueoflegends.com/cdn/' + this.version + '/data/en_US/champion/';

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
        console.log(championDataObj);

        this.champsData = championDataObj;
        this.loadingChampion = false;

        if (this.loadingSummoner === false && this.loadingChampion === false) {
          this.setState({
            spinner: false,
            champsData: this.champsData,
            summonersData: this.summonersData
          });
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
      championIconUrl: null,
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
    this.setState({
      spinner: true
    });
    summonerName = summonerName.toLowerCase().replace(/ /g,'%20');
    const idUrl = SUMMONER_URL + '?summonerName=' + summonerName + '&' + 'region=' + region;
    console.log(idUrl);
    fetch(idUrl, {method: 'GET'})
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.id === undefined) {
          this.setState({
            error: 'Summoner not found',
            region: region,
            spinner: false,
          });
          return;
        }
        const summonerId = res.id;
        const currentGameUrl = GAME_URL + '?id=' + summonerId + '&' + 'region=' + region;

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
            region: region,
            spinner: false,
          });
          return;
        };

        const iconUrl = 'http://ddragon.leagueoflegends.com/cdn/' + this.version +
          '/img/champion/';

        let index = 0;
        for (let i = 0; i < res.participants.length; i++) {
          const participant = res.participants[i];
          if (participant.teamId === 200) {
            const playerSchema = this.generatePlayerSchema();
            playerSchema.playerName = participant.summonerName;
            console.log(champs);
            console.log(participant.championId);
            playerSchema.championName = champs[participant.championId].name;
            playerSchema.championIconUrl = iconUrl + champs[participant.championId].image.full;
            Image.prefetch(playerSchema.championIconUrl);

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
        this.setState({
          spinner: false,
          error: null,
          region: region
        });

        Actions.tracker({
          players: players,
          summonersData: summoners,
        });

      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
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
            spinner={this.state.spinner}
          />
          <Scene key="tracker"
            component={Tracker}
            hideNavBar={Platform.OS === 'ios' ? false : true}
            headerMode={false}
            style={styles.tracker}
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tracker: {
    fontFamily: 'Arial',
    fontSize: 14
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontFamily: 'Arial',
    fontSize: 14
  }
});

export default App;
