import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import ButtonWrap from './ButtonWrap.js';
import CdBox from './CdBox.js';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 1
  },
  iconWrap: {
    height: 60,
    width: 60,
    justifyContent: 'center'
  },
  iconText: {
    textAlign: 'center'
  }
});

class SummonerRow extends Component {
  selectChampion(value) {
    value = value.value;
    this.props.selectChampion(this.props.row, value);
  }

  render() {
    const buttonWrapBoxes = [];
    buttonWrapBoxes.push(<ButtonWrap
      key = {0}
      col = {0}
      row = {this.props.row}
      cooldown = {this.props.player.summonerSpells.cooldown}
      summonerSpell = {this.props.player.summonerSpells.summonerSpell1}
      summonersData = {this.props.summonersData}
      changeSummoners = {this.props.changeSummoners}
      resetTimer = {this.props.resetTimer}
      changeResetTimer = {this.props.changeResetTimer}
    />);

    buttonWrapBoxes.push(<ButtonWrap
      key = {1}
      col = {1}
      row = {this.props.row}
      cooldown = {this.props.player.summonerSpells.cooldown}
      summonerSpell = {this.props.player.summonerSpells.summonerSpell2}
      summonersData = {this.props.summonersData}
      changeSummoners = {this.props.changeSummoners}
      resetTimer = {this.props.resetTimer}
      changeResetTimer = {this.props.changeResetTimer}
    />);

    let champions = [];
    let index = 0;
    for (let key in this.props.champsData) {
      champions.push({
        key: index,
        label: this.props.champsData[key].name,
        value: key
      });
      index++;
    }

    champions = champions.sort((a, b) => {
      var textA = a.label.toUpperCase();
      var textB = b.label.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    if (this.props.selectedChampion === false) {
      return (
        <View style={styles.main}>
          <View>
            <Text>{this.props.name}</Text>
          </View>
          <View style={styles.iconWrap}>
            <ModalSelector
              onChange={this.selectChampion.bind(this)}
              data={champions}
              touchableActiveOpacity={0.7}
            >
              <Text style={styles.iconText}>Select</Text>
            </ModalSelector>
          </View>
          {buttonWrapBoxes}
          <CdBox
            row = {this.props.row}
            player = {this.props.player}
            summonerCooldownAdjust = {this.props.summonerCooldownAdjust}
          />
        </View>
      )
    }

    return (
      <View style={styles.main}>
        <View style={styles.iconWrap}>
          <ModalSelector
            onChange={this.selectChampion.bind(this)}
            data={champions}
            touchableActiveOpacity={0.7}
          >
            <Image
              style={{width: 60, height: 60}}
              source={{uri: this.props.player.championIconUrl}}
            />
          </ModalSelector>
        </View>
        {buttonWrapBoxes}
        <CdBox
          row = {this.props.row}
          player = {this.props.player}
          summonerCooldownAdjust = {this.props.summonerCooldownAdjust}
        />
      </View>
    );
  }
}

export default SummonerRow;
