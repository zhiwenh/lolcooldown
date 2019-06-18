import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';

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
    height: '100%',
    width: 60,
    justifyContent: 'center',
    borderRightWidth: 1
  },
  iconText: {
    textAlign: 'center'
  }
});

class SpellRow extends Component {
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
    const buttonWraps = [];
    for (var i = 0; i < 3; i++) {
      buttonWraps.push(<ButtonWrap
        key = {i}
        row = {this.props.row}
        col = {i}
        page = {this.props.page}
        spellCds = {this.props.spells.data[i]}
        level = {this.props.spells.levels[i]}
        cooldown = {this.props.spells.cooldown}
        spellName = {this.props.spellNames.data[i]}
        spellIconUrl = {this.props.spellIconUrls.data[i]}
        resetTimer = {this.props.resetTimers[i]}
        changeResetTimer = {this.props.changeResetTimer}
      />);
    }
    const ultimateButtonWrap = <UltimateButtonWrap
      key = {3}
      row = {this.props.row}
      col = {3}
      page = {this.props.page}
      spellCds = {this.props.spells.data[3]}
      level = {this.props.spells.levels[3]}
      cooldown = {this.props.spells.cooldown}
      ultimateCooldown = {this.props.spells.ultimateCooldown}
      spellName = {this.props.spellNames.data[3]}
      spellIconUrl = {this.props.spellIconUrls.data[3]}
      resetTimer = {this.props.resetTimers[3]}
      changeResetTimer = {this.props.changeResetTimer}
    />

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

    return (
      <View style={styles.main}>
        <View>
          <Text>{this.props.name}</Text>
        </View>
        <View style={styles.iconWrap}>
          <TouchableOpacity
            onPress={this.showPicker.bind(this)}
          >
            {(() => {
              if (this.props.selectedChampion === false) {
                return (
                  <Text style={styles.iconText}>Select</Text>
                )
              } else {
                return (
                  <Image
                    style={{width: 60, height: 60}}
                    source={{uri: this.props.player.championIconUrl}}
                  />
                )
              }
            })()}
          </TouchableOpacity>
          <ModalFilterPicker
            visible={this.state.visible}
            onSelect={this.selectChampion.bind(this)}
            onCancel={this.cancelPicker.bind(this)}
            options={champions}
            keyboardShouldPersistTaps='handled'
          />
        </View>
        {buttonWraps}
        {ultimateButtonWrap}
      </View>
    );
  }
}

export default SpellRow;
