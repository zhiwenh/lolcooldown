import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class Info extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>{this.props.spellName}</Text>
        <Text>{this.props.spellCd}</Text>
      </View>
    );
  }
}

export default Info;
