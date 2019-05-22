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
    borderLeftWidth: 1
  },
  iconWrap: {
    
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
        spellCds = {this.props.spells.data[i]}
        level = {this.props.spells.levels[i]}
        cooldown = {this.props.spells.cooldown}
        spellName = {this.props.spellNames.data[i]}
        spellIconUrl = {this.props.spellIconUrls.data[i]}
      />);
    }
    const ultimateButtonWrap = <UltimateButtonWrap
      key = {3}
      row = {this.props.row}
      col = {3}
      spellCds = {this.props.spells.data[3]}
      level = {this.props.spells.levels[3]}
      cooldown = {this.props.spells.cooldown}
      ultimateCooldown = {this.props.spells.ultimateCooldown}
      spellName = {this.props.spellNames.data[3]}
      spellIconUrl = {this.props.spellIconUrls.data[3]}
    />

    return (
      <View style={styles.main}>
        <View>
          <Text>{this.props.name}</Text>
        </View>
        <View style={styles.iconWrap}>
          <Image
            style={{width: 60, height: 60}}
            source={{uri: this.props.player.championIconUrl}}
          />
        </View>
        {buttonWraps}
        {ultimateButtonWrap}
      </View>
    );
  }
}

export default SpellRow;
