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

class ButtonWrap extends Component {
  render() {
    const summonerName = this.props.summonerSpell.name;
    let summonerCd = this.props.summonerSpell.cooldown;

    const cooldown = this.props.cooldown;
    summonerCd = summonerCd - summonerCd * cooldown / 100;
    summonerCd = summonerCd.toFixed(1);
    return (
      <View style={styles.main}>
        <Info
          row = {this.props.row}
          col = {this.props.col}
          summonerSpellName = {summonerName}
          summonerSpellCooldown = {summonerCd}
          changeSummoners = {this.props.changeSummoners}
        />
        <Button
          row = {this.props.row}
          col = {this.props.col}
          summonerSpellCooldown = {summonerCd}
        />
      </View>
    );
  }
}

export default ButtonWrap;
