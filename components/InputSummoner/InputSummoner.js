import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Dimensions
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
        <View>
          <Text style={{textAlign: 'center'}}>Select region:</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontFamily: 'Arail'
  },
  input: {
    textAlign: 'center',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    width: Dimensions.get('window').width - 15
  },
  topHolder: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHolder: {
    flex: 1
  },
  error: {
    color: 'red'
  },
  errorWrap: {
    height: 30
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  selectorText: {
    fontSize: 14,
    fontFamily: 'Arial'
  },
  selectorSelect: {
    width: 65,
    alignItems:'center',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default InputSummoner;
