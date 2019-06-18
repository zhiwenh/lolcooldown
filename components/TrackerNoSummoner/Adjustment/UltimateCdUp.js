import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderBottomWidth: 0.5,
    backgroundColor: '#f9f9f9',
    paddingLeft: 3,
    paddingRight: 3
  }
});

class CdLevelDown extends Component {
  onPress() {
    if (this.props.spells.ultimateCooldown + 4 <= 25) {
      if (this.props.spells.ultimateCooldown === 0) {
        this.props.ultimateCooldownAdjust(this.props.row, 5);
      } else {
        this.props.ultimateCooldownAdjust(this.props.row, 4);
      }
    }
  }
  render() {
    return (
      <TouchableHighlight
        onPress = {this.props.selectedChampion ? this.onPress.bind(this) : null}
        style = {styles.main}
        underlayColor='#e6e6e6'
      >
        <Text style = {styles.text}>
          {(() => {
            if (this.props.selectedChampion === true) {
              return '+ ' + this.props.spells.ultimateCooldown + '% Ult CD';
            }
          })()}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelDown;
