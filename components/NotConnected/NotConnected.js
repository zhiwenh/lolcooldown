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
import Spinner from 'react-native-loading-spinner-overlay';

class NotConnected extends Component {

  render() {
    return (
      <View style = {styles.container}>
        <ImageBackground
          source={require('./../../images/hextech_poppy.jpg')}
          style={{width: '100%', height: '100%'}}
        >
          <Spinner
             visible={this.props.spinner}
             textContent={'Loading...'}
             textStyle={styles.spinnerTextStyle}
           />
          <View style = {styles.topHolder}>
            <Text style={styles.title}>
              League of Legends Cooldown Tracker
            </Text>
          </View>
          <View style={styles.bottomHolder}>
            <View style={{height: 20}}/>
            <View style={styles.continueWrap}>
              <Text style={styles.notConnectedText}>Not connected to the internet</Text>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={this.props.retryConnection}
                activeOpacity={0.8}
              >
                <Text style={styles.retryText}>Retry?</Text>
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
    fontWeight: 'bold',
    fontSize: 18
  },
  notConnectedText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },
  retryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  }
});

export default NotConnected;
