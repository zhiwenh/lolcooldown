import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';

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
  constructor(props) {
    super(props);
    this.state = {}
    this.state.visible = false;

    this.showPicker = this.showPicker.bind(this);
    this.cancelPicker = this.cancelPicker.bind(this);
  }

  showPicker() {
    this.setState({
      visible: true
    });
  }

  cancelPicker() {
    this.setState({
      visible: false
    });
  }

  selectChampion(value) {
    this.setState({
      visible: false
    });

    if (this.props.player.championId === value) return;
    this.props.selectChampion(this.props.row, value);
  }

  render() {
    const buttonWrapBoxes = [];
    buttonWrapBoxes.push(<ButtonWrap
      key = {0}
      col = {0}
      row = {this.props.row}
      page = {this.props.page}
      cooldown = {this.props.player.summonerSpells.cooldown}
      summonerSpell = {this.props.player.summonerSpells.summonerSpell1}
      summonersData = {this.props.summonersData}
      changeSummoners = {this.props.changeSummoners}
      resetTimer = {this.props.resetTimers[0]}
      changeResetTimer = {this.props.changeResetTimer}
    />);

    buttonWrapBoxes.push(<ButtonWrap
      key = {1}
      col = {1}
      row = {this.props.row}
      page = {this.props.page}
      cooldown = {this.props.player.summonerSpells.cooldown}
      summonerSpell = {this.props.player.summonerSpells.summonerSpell2}
      summonersData = {this.props.summonersData}
      changeSummoners = {this.props.changeSummoners}
      resetTimer = {this.props.resetTimers[1]}
      changeResetTimer = {this.props.changeResetTimer}
    />);

    let champions = [];
    let index = 0;
    for (let key in this.props.champsData) {
      champions.push({
        key: key,
        label: this.props.champsData[key].name,
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
            <TouchableOpacity
              onPress={this.showPicker.bind(this)}
            >
              <Text style={styles.iconText}>Select</Text>
            </TouchableOpacity>
            <ModalFilterPicker
              visible={this.state.visible}
              onSelect={this.selectChampion.bind(this)}
              onCancel={this.cancelPicker.bind(this)}
              options={champions}
              keyboardShouldPersistTaps='handled'
            />
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
          <TouchableOpacity
            onPress={this.showPicker.bind(this)}
          >
            <Image
              style={{width: 60, height: 60}}
              source={{uri: this.props.player.championIconUrl}}
            />
          </TouchableOpacity>
          <ModalFilterPicker
            visible={this.state.visible}
            onSelect={this.selectChampion.bind(this)}
            onCancel={this.cancelPicker.bind(this)}
            options={champions}
          />
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
