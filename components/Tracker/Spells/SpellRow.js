import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import ButtonWrap from './ButtonWrap';
import UltimateButtonWrap from './UltimateButtonWrap';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

class SpellRow extends Component {
  render() {
    const buttonWraps = [];
    for (var i = 0; i < 3; i++) {
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
    const ultimateButtonWrap = <UltimateButtonWrap
      key = {3}
      row = {this.props.row}
      col = {3}
      spellCds = {this.props.spells.data1[3]}
      level = {this.props.spells.levels[3]}
      cooldown = {this.props.spells.cooldown}
      ultimateCooldown = {this.props.spells.ultimateCooldown}
      spellName = {this.props.spellNames.data1[3]}
    />

    const iconUrl = 'http://ddragon.leagueoflegends.com/cdn/' + this.props.version +
      '/img/champion/' + this.props.player.championIcon;

    console.log('iconUrl', iconUrl);

    return (
      <View style={styles.main}>
        <View>
          <Text>{this.props.name}</Text>
        </View>
        <View>
          <Image style={{width: 50, height: 50}} source={{uri: iconUrl}}/>
        </View>
        {buttonWraps}
        {ultimateButtonWrap}
      </View>
    );
  }
}

export default SpellRow;
