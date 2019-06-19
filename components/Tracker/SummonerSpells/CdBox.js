import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import CdLevelUp from './CdLevelUp';
import CdLevelDown from './CdLevelDown';

const styles = StyleSheet.create({
  main: {
    flex: 1.5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: '#f9f9f9',
  }
});

class CdBox extends Component {
  render() {
    return (
      <View style={styles.main}>
        <CdLevelUp
          row = {this.props.row}
          player = {this.props.player}
          cooldownAdjust = {this.props.cooldownAdjust}
        />
        <CdLevelDown
          row = {this.props.row}
          player = {this.props.player}
          cooldownAdjust = {this.props.cooldownAdjust}
        />
      </View>
    );
  }
}

export default CdBox;
