import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';

import AdjBox from './AdjBox';
import CdBox from './CdBox';
import UltimateCdBox from './UltimateCdBox';

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

class AdjRow extends Component {
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
    const adjBoxes = [];
    for (var i = 0; i < 4; i++) {
      if (i === 0) {
        adjBoxes.push(<AdjBox
          key = {i}
          col = {i}
          row = {this.props.row}
          skill = 'Q'
          level = {this.props.spells.levels[i]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
        />);
      } else if (i === 1) {
        adjBoxes.push(<AdjBox
          key = {i}
          col = {i}
          row = {this.props.row}
          skill = 'W'
          level = {this.props.spells.levels[i]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
        />);
      } else if (i === 2) {
        adjBoxes.push(<AdjBox
          key = {i}
          col = {i}
          row = {this.props.row}
          skill = 'E'
          level = {this.props.spells.levels[i]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
        />);
      } else if (i === 3) {
        adjBoxes.push(<AdjBox
          key = {i}
          col = {i}
          row = {this.props.row}
          skill = 'R'
          level = {this.props.spells.levels[i]}
          spellLevelUp = {this.props.spellLevelUp}
          spellLevelDown = {this.props.spellLevelDown}
        />);
      }
    }

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
        {adjBoxes}
        <UltimateCdBox
          row = {this.props.row}
          spells = {this.props.spells}
          ultimateCooldownAdjust = {this.props.ultimateCooldownAdjust}
        />
        <CdBox
          row = {this.props.row}
          cooldown = {this.props.spells.cooldown}
          cooldownAdjust = {this.props.cooldownAdjust}
        />
      </View>
    );
  }
}

export default AdjRow;
