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
    backgroundColor: 'powderblue'
  },
  spellName: {
    textAlign: 'center'
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
