import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, BackHandler} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import NetInfo from "@react-native-community/netinfo";

import InputSummoner from './components/InputSummoner/InputSummoner.js';
import Tracker from './components/Tracker/Tracker.js';
import TrackerNoSummoner from './components/TrackerNoSummoner/TrackerNoSummoner.js';
import ManualLoadUpPage from './components/ManualLoadUpPage/ManualLoadUpPage.js';
import NotConnected from './components/NotConnected/NotConnected.js';

const VERSION_NUMBER_URL = 'https://league-cooldown.herokuapp.com/version';
const REQUEST_GAME_URL = 'https://league-cooldown.herokuapp.com/requestPlayerGame';
const MANUAL = false;

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
    state.connected;

    this.state = state;

    this.summonersData = null;
    this.champsData = null;
    this.loadingSummoner = true;
    this.loadingChampion = true;
    this.version = null;
    this.gameRequestBreak = false;

    this.getStaticData = this.getStaticData.bind(this);
    this.getChampionStaticData = this.getChampionStaticData.bind(this);
    this.getSummonerStaticData = this.getSummonerStaticData.bind(this);
    this.generatePlayerSchema = this.generatePlayerSchema.bind(this);
    this.requestPlayerGame = this.requestPlayerGame.bind(this);
    this.noSummoner = this.noSummoner.bind(this);
    this.retryConnection = this.retryConnection.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });

    NetInfo.fetch().then(state => {
      if (state.isConnected) this.getStaticData();
      else {
        this.setState({
          connected: false,
          spinner: false
        })
      }
    });
  }

  getStaticData() {
    let versionUrl = VERSION_NUMBER_URL;
    console.log(versionUrl);
    fetch(versionUrl, {method: 'GET'})
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
    const summonerUrl = 'https://ddragon.leagueoflegends.com/cdn/' + this.version +
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

        if (this.loadingSummoner === false && this.loadingChampion === false) {
          this.setState({
            spinner: false,
            champsData: this.champsData,
            summonersData: this.summonersData
          });

          if (MANUAL === true) {
            this.noSummoner();
          }
        }
      })
      .catch(err => {
        this.loadingSummoner = false;
        if (this.loadingSummoner === false && this.loadingChampion === false) {
          this.setState({
            spinner: false,
            champsData: this.champsData,
            summonersData: this.summonersData
          });
        }
        console.log(err);
      });
  }

  getChampionStaticData() {
    const championUrl = 'https://ddragon.leagueoflegends.com/cdn/' + this.version +
      '/data/en_US/champion.json';
    const individualChampionUrlPrefix =
      'https://ddragon.leagueoflegends.com/cdn/' + this.version + '/data/en_US/champion/';

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

        this.champsData = championDataObj;
        this.loadingChampion = false;

        if (this.loadingSummoner === false && this.loadingChampion === false) {
          this.setState({
            spinner: false,
            champsData: this.champsData,
            summonersData: this.summonersData
          });

          if (MANUAL === true) {
            this.noSummoner();
          }
        }
      })
      .catch(err => {
        this.loadingChampion = false;
        if (this.loadingSummoner === false && this.loadingChampion === false) {
          this.setState({
            spinner: false,
            champsData: this.champsData,
            summonersData: this.summonersData,
          });
        }
        console.log(err);
      })
  }

  generatePlayerSchema() {
    const playerSchema = {
      playerName: null,
      championName: null,
      championIconUrl: null,
      championId: null,
      spells: {
        cooldown: 0,
        ultimateCooldown: 0,
        cooldownPerLevel: 0,
        levels: {
          '0': 1, '1': 1, '2': 1, '3': 1, '4': 1
        },
        // all 0 as a work around for Spell.js not being able to read null
        data: {
          '0': 0, '1': 0, '2': 0, '3': 0, '4': 0
        }
      },
      spellNames: {
        data: {
          '0': null, '1': null, '2': null, '3': null, '4': null
        }
      },
      summonerSpells: {
        cooldown: 0,
        summonerSpell1: {
          name: null,
          cooldown: null,
          summonerIconUrl: null
        },
        summonerSpell2: {
          name: null,
          cooldown: null,
          summonerIconUrl: null
        }
      },
      spellIconUrls: {
        data: {
          '0': null, '1': null, '2': null, '3': null, '4': null
        }
      }
    };
    return playerSchema;
  }

  async requestPlayerGame(summonerName, region) {
    const connection = await NetInfo.fetch();
    if (connection.isConnected === false) {
      this.setState({
        connected: false
      });
      return;
    }

    this.setState({
      region: region,
      spinner: true
    });

    const urlSummonerName = summonerName.toLowerCase().replace(/ /g,'%20');
    const requestGameUrl = REQUEST_GAME_URL + '?summonerName=' + urlSummonerName + '&' +
      'region=' + region;
    console.log(requestGameUrl);
    fetch(requestGameUrl, {method: 'GET'})
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status && res.status.message.match('Exception decrypting undefined')) {
          this.gameRequestBreak = true;
          this.setState({
            error: 'Summoner not found',
            region: region,
            spinner: false,
          });
          return;
        } else if (res.status && res.status.message.match('Data not found')) {
          this.gameRequestBreak = true;
          this.setState({
            error: 'Summoner not in game',
            region: region,
            spinner: false,
          });
          return;
        } else if (res.status && res.status.message) {
          this.gameRequestBreak = true;
          this.setState({
            error: 'Error',
            region: region,
            spinner: false,
          });
          return;
        }

        const champs = this.state.champsData;
        const summoners = this.state.summonersData;
        const players = {};

        const iconUrl = 'https://ddragon.leagueoflegends.com/cdn/' + this.version + '/img/champion/';
        const spellIconUrl = 'https://ddragon.leagueoflegends.com/cdn/' + this.version + '/img/spell/'
        const summonerIconUrl = 'https://ddragon.leagueoflegends.com/cdn/' + this.version + '/img/spell/'

        let opponentId;
        for (let i = 0; i < res.participants.length; i++) {
          if (res.participants[i].summonerName.toLowerCase() === summonerName.toLowerCase()) {
            opponentId = (res.participants[i].teamId === 100) ? 200 : 100;
            break;
          }
        }

        let index = 0;
        for (let i = 0; i < res.participants.length; i++) {
          const participant = res.participants[i];
          if (participant.teamId === opponentId) {
            try {
              const championName = champs[participant.championId].name
            } catch(err) {
              continue;
            }
            const playerSchema = this.generatePlayerSchema();
            playerSchema.playerName = participant.summonerName;
            playerSchema.championName = champs[participant.championId].name;
            playerSchema.championIconUrl = iconUrl + champs[participant.championId].image.full;
            Image.prefetch(playerSchema.championIconUrl);

            const summonerSpell1 = summoners[participant.spell1Id];
            playerSchema.summonerSpells.summonerSpell1.name = summonerSpell1.name;
            playerSchema.summonerSpells.summonerSpell1.cooldown = summonerSpell1.cooldown[0];
            playerSchema.summonerSpells.summonerSpell1.summonerIconUrl = summonerIconUrl + summonerSpell1.image.full;

            const summonerSpell2 = summoners[participant.spell2Id];
            playerSchema.summonerSpells.summonerSpell2.name = summonerSpell2.name;
            playerSchema.summonerSpells.summonerSpell2.cooldown = summonerSpell2.cooldown[0];
            playerSchema.summonerSpells.summonerSpell2.summonerIconUrl = summonerIconUrl + summonerSpell2.image.full;

            champs[participant.championId].spells.forEach((spell, index2) => {
              playerSchema.spellNames.data[index2] = spell.name;
              playerSchema.spells.data[index2] = spell.cooldown;
              playerSchema.spellIconUrls.data[index2] = spellIconUrl + spell.image.full;
              // Image.prefetch(playerSchema.spellIconUrls.data1[index2]);
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
          version: this.version
        });

      }).catch((err) => {
        if (this.gameRequestBreak === true) {
          this.gameRequestBreak = false;
          return;
        }
        this.setState({
          spinner: false,
          error:  'Error',
          region: region
        });
        console.log(err);
      });
  }

  noSummoner() {
    const players = {};
    for (let i = 0; i < 5; i++) {
      const playerSchema = this.generatePlayerSchema();
      playerSchema.playerName = undefined;
      playerSchema.championName = '-';
      playerSchema.championIconUrl = undefined;
      playerSchema.championId = undefined;

      playerSchema.summonerSpells.summonerSpell1.name = undefined;
      playerSchema.summonerSpells.summonerSpell1.cooldown = 0;

      playerSchema.summonerSpells.summonerSpell2.name = undefined;
      playerSchema.summonerSpells.summonerSpell2.cooldown = 0;

      for (let j = 0; j < 5; j++) {
        playerSchema.spellNames.data[j] = undefined;
        playerSchema.spells.data[j] = [null];
        playerSchema.spellIconUrls.data[j] = undefined;
      }

      players[i] = playerSchema;
    }

    Actions.trackerNoSummoner({
      players: players,
      summonersData: this.state.summonersData,
      champsData: this.state.champsData,
      version: this.version
    });
  }

  retryConnection() {
    this.setState({
      spinner: true
    });

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({
          connected: true
        });
        this.getStaticData();
      } else {
        this.setState({
          connected: false,
          spinner: false
        })
      }
    });
  }

  render() {
    if (this.state.connected === false) {
      return (
        <Router>
          <Scene key="root" panHandlers={null}>
            <Scene
              key="notConnected"
              component={NotConnected}
              hideNavBar={true}
              spinner={this.state.spinner}
              retryConnection={this.retryConnection}
            />
          </Scene>
        </Router>
      )
    }

    if (MANUAL === true) {
      return (
        <Router>
          <Scene key="root" panHandlers={null}>
            <Scene
              key="manualLoadUpPage"
              component={ManualLoadUpPage}
              hideNavBar={true}
              spinner={this.state.spinner}
            />
            <Scene key="trackerNoSummoner"
              component={TrackerNoSummoner}
              hideNavBar={Platform.OS === 'ios' ? false : true}
              headerMode={false}
              style={styles.tracker}
              renderLeftButton={()=>(null)}
              manual={MANUAL}
            />
          </Scene>
        </Router>
      )
    }

    return (
      <Router>
        <Scene key="root">
          <Scene
            key="inputSummoner"
            component={InputSummoner}
            requestPlayerGame={this.requestPlayerGame}
            noSummoner={this.noSummoner}
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
          <Scene key="trackerNoSummoner"
            component={TrackerNoSummoner}
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
