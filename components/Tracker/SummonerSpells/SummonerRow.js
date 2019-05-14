import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

import ButtonWrap from './ButtonWrap.js';
import CdBox from './CdBox.js';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

class SummonerRow extends Component {
  render() {
    const buttonWrapBoxes = [];
      buttonWrapBoxes.push(<ButtonWrap
        key = {0}
        col = {0}
        row = {this.props.row}
        cooldown = {this.props.player.summonerSpells.cooldown}
        summonerSpell = {this.props.player.summonerSpells.summonerSpell1}
        summonersData = {this.props.summonersData}
        changeSummoners = {this.props.changeSummoners}
      />);

      buttonWrapBoxes.push(<ButtonWrap
        key = {1}
        col = {1}
        row = {this.props.row}
        cooldown = {this.props.player.summonerSpells.cooldown}
        summonerSpell = {this.props.player.summonerSpells.summonerSpell2}
        summonersData = {this.props.summonersData}
        changeSummoners = {this.props.changeSummoners}
      />);

    return (
      <View style={styles.main}>
        <View>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: this.props.player.championIconUrl}}
          />
        </View>
        {buttonWrapBoxes}
        <CdBox
          row = {this.props.row}
          player = {this.props.player}
          cooldownAdjust = {this.props.cooldownAdjust}
        />
      </View>
    );
  }
}

export default SummonerRow;
