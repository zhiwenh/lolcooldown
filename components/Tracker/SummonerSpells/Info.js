import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    backgroundColor: '#e6f2ff'
  },
  picker: {
    alignItems:'center',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: 'Arial'
  }
});

class Info extends Component {
  onValueChange(value) {
    value = value.value;
    if (value !== this.props.summonerSpellName) {
      const summonersData = this.props.summonersData;
      let summonerKey;
      for (let key in summonersData) {
        if (summonersData[key].name === value) {
          console.log('here')
          summonerKey = key
        }
      }
      this.props.changeSummoners(this.props.row, this.props.col, summonerKey);
    }
  }

  render() {
    const summonerSpellNames = [];
    const summonersData = this.props.summonersData;
    let index = 0;
    for (let key in summonersData) {
      summonerSpellNames.push({
        key: index,
        label: summonersData[key].name,
        value: summonersData[key].name
      });
      index++;
    }

    return (
      <View style={styles.main}>
        <View />
        <View>
          <ModalSelector
            onChange={this.onValueChange.bind(this)}
            data={summonerSpellNames}
            selectStyle={{borderWidth: 0}}
            selectTextStyle={styles.picker}
            initValue={this.props.summonerSpellName}
          />
        </View>
      </View>
    );
  }
}

export default Info;
