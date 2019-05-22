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

class InputSummoner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.region = this.props.region;
    this.state.error = this.props.error;
    this.state.spinner = this.props.spinner;
  }

  onSubmitEditing(event) {
    this.props.requestPlayerGame(event.nativeEvent.text, this.state.region);
    console.log(event.nativeEvent.text);
  }

  regionSelect(value) {
    value = value.value;
    this.setState({region: value});
  }

  render() {
    let regions = ['NA1', 'EUW1', 'EUN1', 'BR1',
      'JP1', 'KR', 'LA1', 'LA2', 'RU', 'TR1', 'OC1'];

    regions = regions.map((region, index) => {
      return {
        key: index,
        label: region,
        value: region
      }
    });

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
            placeholder = 'Input summoner currently in game'
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
              initValue={this.state.region}
            />
            <View style={{height: 20}}/>
            <View style={styles.continueWrap}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={this.props.noSummoner}
                activeOpacity={0.8}
              >
                <Text style={styles.continueText}>Continue without summoner name</Text>
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
    flex: 2,
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
