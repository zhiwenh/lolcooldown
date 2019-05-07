import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input: {
    textAlign: 'center',
    color: 'red',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    width: 300
  },
  topHolder: {
    flex: 2,
    backgroundColor: 'green'
  },
  bottomHolder: {
    flex: 1,
    backgroundColor: 'blue'
  }
});

class InputSummoner extends Component {
  constructor(props) {
    super(props);
  }
  onSubmitEditing(event) {
    console.log(event.nativeEvent.text);
    this.props.requestPlayerGame(event.nativeEvent.text);
  }
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.topHolder} />
        <TextInput
          style = {styles.input}
          onSubmitEditing = {this.onSubmitEditing.bind(this)}
          clearButtonMode = "always"
        />
        <Text>Summoner Name</Text>
        <View style={styles.bottomHolder} />
      </View>
    );
  }
}

export default InputSummoner;
