import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import UltimateCdUp from './UltimateCdUp';
import UltimateCdDown from './UltimateCdDown';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderLeftWidth: 1,
    backgroundColor: '#f9f9f9'
  }
});

class UltimateCdBox extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <UltimateCdUp
          row = {this.props.row}
          spells = {this.props.spells}
          ultimateCooldownAdjust = {this.props.ultimateCooldownAdjust}
        />
        <UltimateCdDown
          row = {this.props.row}
          spells = {this.props.spells}
          ultimateCooldownAdjust = {this.props.ultimateCooldownAdjust}
        />
      </View>
    );
  }
}

export default UltimateCdBox;
