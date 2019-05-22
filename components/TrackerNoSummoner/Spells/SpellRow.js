import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import ButtonWrap from './ButtonWrap';
import UltimateButtonWrap from './UltimateButtonWrap';


const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

class SpellRow extends Component {
  selectChampion(value) {
    value = value.value;
    this.props.selectChampion(this.props.row, value);
  }

  render() {
    const buttonWraps = [];
    for (var i = 0; i < 3; i++) {
      buttonWraps.push(<ButtonWrap
        key = {i}
        row = {this.props.row}
        col = {i}
        spellCds = {this.props.spells.data[i]}
        level = {this.props.spells.levels[i]}
        cooldown = {this.props.spells.cooldown}
        spellName = {this.props.spellNames.data[i]}
        spellIconUrl = {this.props.spellIconUrls.data[i]}
        resetTimer = {this.props.resetTimer}
        changeResetTimer = {this.props.changeResetTimer}
      />);
    }
    const ultimateButtonWrap = <UltimateButtonWrap
      key = {3}
      row = {this.props.row}
      col = {3}
      spellCds = {this.props.spells.data[3]}
      level = {this.props.spells.levels[3]}
      cooldown = {this.props.spells.cooldown}
      ultimateCooldown = {this.props.spells.ultimateCooldown}
      spellName = {this.props.spellNames.data[3]}
      spellIconUrl = {this.props.spellIconUrls.data[3]}
      resetTimer = {this.props.resetTimer}
      changeResetTimer = {this.props.changeResetTimer}
    />

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
          {buttonWraps}
          {ultimateButtonWrap}
        </View>
      )
    }
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
            <Image
              style={{width: 60, height: 60}}
              source={{uri: this.props.player.championIconUrl}}
            />
          </ModalSelector>
        </View>
        {buttonWraps}
        {ultimateButtonWrap}
      </View>
    );
  }
}

export default SpellRow;
