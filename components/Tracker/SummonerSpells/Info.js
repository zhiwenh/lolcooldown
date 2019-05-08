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
  onPress() {
    this.props.changeSummoners(this.props.row, this.props.col)
  }
  render() {
    return (
      <View
        style={styles.main}
      >
        <Text>{this.props.summonerSpellName}</Text>
        <Text>{this.props.summonerSpellCooldown}</Text>
      </View>
    );
  }
}

export default Info;
