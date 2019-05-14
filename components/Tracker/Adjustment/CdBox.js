import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import CdLevelUp from './CdLevelUp';
import CdLevelDown from './CdLevelDown';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: '#eef2f7'
  }
});

class CdBox extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <CdLevelUp
          row = {this.props.row}
          cooldown = {this.props.cooldown}
          cooldownAdjust = {this.props.cooldownAdjust}
        />
        <CdLevelDown
          row = {this.props.row}
          cooldown = {this.props.cooldown}
          cooldownAdjust = {this.props.cooldownAdjust}
        />
      </View>
    );
  }
}

export default CdBox;
