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
    borderWidth: 1
  }
});

class CdBox extends React.Component {
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
