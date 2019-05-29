import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

class InputSummoner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.regionLabel = this.props.regionLabel;
    this.state.regionValue = this.props.regionValue;
    this.state.error = this.props.error;
    this.state.spinner = this.props.spinner;
  }

  onSubmitEditing(event) {
    this.props.requestPlayerGame(
      event.nativeEvent.text,
      this.state.regionLabel,
      this.state.regionValue
    );
    console.log(event.nativeEvent.text);
  }

  regionSelect(value) {
    AsyncStorage.setItem('regionLabel', value.label);
    AsyncStorage.setItem('regionValue', value.value);
    this.setState({regionValue: value.value, regionLabel: value.label});
  }

  render() {
    let regions = [
      {key: 0, label: 'NA', value: 'NA1'},
      {key: 1, label: 'EUW', value: 'EUW1'},
      {key: 2, label: 'EUNE', value: 'EUN1'},
      {key: 3, label: 'BR', value: 'BR1'},
      {key: 4, label: 'JP', value: 'JP1'},
      {key: 5, label: 'KR', value: 'KR'},
      {key: 6, label: 'LAN', value: 'LA1'},
      {key: 7, label: 'LAS', value: 'LA2'},
      {key: 8, label: 'RU', value: 'RU'},
      {key: 9, label: 'TR', value: 'TR1'},
      {key: 10, label: 'OC', value: 'OC1'}
    ];

    return (
      <View style = {styles.container}>
        <ImageBackground
          source={require('./../../images/hextech_poppy.jpg')}
          style={{width: '100%', height: '100%'}}
        >
          <Spinner
             visible={this.state.spinner}
             textContent={'Loading...'}
             textStyle={styles.spinnerTextStyle}
           />
          <View style = {styles.topHolder}>
            <Text style={styles.title}>
              League of Legends Cooldown Tracker
            </Text>
          </View>
          <TextInput
            style = {styles.input}
            placeholder = 'Enter summoner currently in game'
            onSubmitEditing = {this.onSubmitEditing.bind(this)}
            clearButtonMode = "always"
            autoCorrect = {false}
          />
          <View style={styles.errorWrap}>
            <Text style={styles.error}>{this.props.error}</Text>
          </View>
          <View style={styles.regionWrap}>
            <Text style={styles.regionText}>Select region:</Text>
          </View>
          <View style={styles.bottomHolder}>
            <ModalSelector
              onChange={this.regionSelect.bind(this)}
              data={regions}
              selectTextStyle={styles.selectorText}
              selectStyle={styles.selectorSelect}
              initValue={this.state.regionLabel}
            />
            <View style={{height: 20}}/>
            <View style={styles.continueWrap}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={this.props.noSummoner}
                activeOpacity={0.8}
              >
                <Text style={styles.continueText}>Continue without summoner</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: 'Arail'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  topHolder: {
    flex: 2.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10
  },
  input: {
    textAlign: 'center',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    width: Dimensions.get('window').width,
    backgroundColor: 'white'
  },
  bottomHolder: {
    flex: 1,
    alignItems: 'center'
  },
  errorWrap: {
    height: 30,
    alignItems:'center',
  },
  error: {
    color: 'red'
  },
  regionWrap: {
    alignItems:'center',
    justifyContent: 'center'
  },
  regionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15
  },
  selectorText: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: 'black'
  },
  selectorSelect: {
    width: 65,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  continueWrap: {

  },
  continueButton: {

  },
  continueText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14
  }
});

export default InputSummoner;
