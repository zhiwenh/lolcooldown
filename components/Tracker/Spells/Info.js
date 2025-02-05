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
    borderBottomWidth: 0.5,
    padding: 2
  },
  spellName: {
    textAlign: 'center',
    color: 'black'
  }
});

class Info extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.spellName}>{this.props.spellName}</Text>
      </View>
    );
  }
}

export default Info;
