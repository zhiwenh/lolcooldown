import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native';
import PickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5
  },
  picker: {
    color: 'black',
    alignItems:'center',
    justifyContent: 'center',
  }
});

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.summonerSpellName = this.props.summonerSpellName;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({summonerSpellName: nextProps.summonerSpellName})
  }

  onValueChange(value) {
    if (value !== this.state.summonerSpellName) {
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
        <View
        >
          <PickerSelect
            placeholder={{}}
            onValueChange={this.onValueChange.bind(this)}
            items={summonerSpellNames}
            style={styles.picker}
            value={this.state.summonerSpellName}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </View>
    );
  }
}

export default Info;
