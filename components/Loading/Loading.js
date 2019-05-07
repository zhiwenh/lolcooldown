import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
// props: players
// prop methods: startSpellTimer, stopSpellTimer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
}

export default Loading;
