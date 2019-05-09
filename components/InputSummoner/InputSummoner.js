import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Dimensions
} from 'react-native';
const API_KEY = require('./../../API_KEY.json').key;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input: {
    textAlign: 'center',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    width: Dimensions.get('window').width
  },
  topHolder: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHolder: {
    flex: 1
  },
  picker: {
    height: 50,
    width: 100
  },
  error: {
    color: 'red'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

class InputSummoner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.region = this.props.region;
  }
  onSubmitEditing(event) {
    this.props.requestPlayerGame(event.nativeEvent.text, this.state.region);
    console.log(event.nativeEvent.text);
  }
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.topHolder}>
          <Text style={styles.title}>
            League of Legends Cooldown Tracker
          </Text>
        </View>
        <TextInput
          style = {styles.input}
          placeholder = 'Input summoner currently in game'
          onSubmitEditing = {this.onSubmitEditing.bind(this)}
          clearButtonMode = "always"
          autoCorrect = {false}
        />
        <Text style={styles.error}>{this.props.error}</Text>
        <View style={styles.bottomHolder}>
          <Picker
            selectedValue={this.state.region}
            style={styles.picker}
            onValueChange={(value) => this.setState({region: value})}
          >
            <Picker.Item label="NA1" value="NA1" />
            <Picker.Item label="EUW1" value="EUW1" />
            <Picker.Item label="EUN1" value="EUN1" />
            <Picker.Item label="BR1" value="BR1" />
            <Picker.Item label="JP1" value="JP1" />
            <Picker.Item label="KR" value="KR" />
            <Picker.Item label="LA1" value="LA1" />
            <Picker.Item label="LA2" value="LA2" />
            <Picker.Item label="RU" value="RU" />
            <Picker.Item label="TR1" value="TR1" />
            <Picker.Item label="OC1" value="OC1" />
          </Picker>
        </View>
      </View>
    );
  }
}

export default InputSummoner;
