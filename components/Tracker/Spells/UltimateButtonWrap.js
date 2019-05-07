import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Info from './Info';
import Button from './Button';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderWidth: 1,
  }
});

class UltimateButtonWrap extends Component {
  render() {
    var spellCd = this.props.spellCds[this.props.level - 1];
    spellCd = spellCd - spellCd * this.props.cooldown/100;
    spellCd = spellCd - spellCd * this.props.ultimateCooldown/100;
    spellCd = spellCd.toFixed(1);
    return (
      <View style={styles.main}>
        <Info
          row = {this.props.row}
          col = {this.props.col}
          spellCd = {spellCd}
          spellName = {this.props.spellName}
        />
        <Button
          row = {this.props.row}
          col = {this.props.col}
          spellCd = {spellCd}
        />
      </View>
    );
  }
}

export default UltimateButtonWrap;
