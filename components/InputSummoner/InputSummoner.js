import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Dimensions,
  ImageBackground
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Spinner from 'react-native-loading-spinner-overlay';

const BACKGROUND_URL = 'http://www.lol-wallpapers.com/wp-content/uploads/2018/06/Hextech-Poppy-Splash-Art-HD-Wallpaper-Background-Official-Art-Artwork-League-of-Legends-lol.jpg'

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

  onChange(value) {
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
          source={{uri: BACKGROUND_URL}}
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
              onChange={this.onChange.bind(this)}
              data={regions}
              selectTextStyle={styles.selectorText}
              selectStyle={styles.selectorSelect}
              initValue={this.state.region}
            />
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
  topHolder: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
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
  error: {
    color: 'red'
  },
  errorWrap: {
    height: 30,
    alignItems:'center',
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
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default InputSummoner;
