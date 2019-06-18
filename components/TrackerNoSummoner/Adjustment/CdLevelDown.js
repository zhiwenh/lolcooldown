import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingLeft: 3,
    paddingRight: 3
  }
});

class CdLevelDown extends Component {
  onPress() {
    if (this.props.cooldown - 5 >= 0) {
      this.props.cooldownAdjust(this.props.row, -5);
    }
  }
  render() {
    return (
      <TouchableHighlight
        onPress = {this.props.selectedChampion ? this.onPress.bind(this) : null}
        style = {styles.main}
        underlayColor='#e6e6e6'
      >
        <Text>
          {(() => {
            if (this.props.selectedChampion === true) {
              return '-';
            }
          })()}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default CdLevelDown;
