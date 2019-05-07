import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import ButtonWrap from './ButtonWrap';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'powderblue',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

class SpellRow extends Component {
  render() {
    const buttonWraps = [];
    for (var i = 0; i < 4; i++) {
      buttonWraps.push(<ButtonWrap
        key = {i}
        row = {this.props.row}
        col = {i}
        spellCds = {this.props.spells.data1[i]}
        level = {this.props.spells.levels[i]}
        cooldown = {this.props.spells.cooldown}
        spellName = {this.props.spellNames.data1[i]}
      />);
    }
    return (
      <View style={styles.main}>
        <View>
          <Text>{this.props.name}</Text>
        </View>
        {buttonWraps}
      </View>
    );
  }
}

export default SpellRow;
