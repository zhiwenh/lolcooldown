import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

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
    this.selectedChampion = false;
  }

  selectChampion(value) {
    this.selectedChampion = true;
    value = value.value;
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
