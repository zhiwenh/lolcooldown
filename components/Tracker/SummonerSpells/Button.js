import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const styles = StyleSheet.create({
  touchableNotTicking: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  },
  touchableIsTicking: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'red',
  },
  imageNotTicking: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageNotTicking: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIsTicking: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 10
  }
});


class Button extends Component {
  constructor(props) {
    super(props);
    this.timer;
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.onPress = this.onPress.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      // initial spell cooldown with level and cd % adjustment
      // initial: this.props.spellCds[this.props.level],
      initial: this.props.summonerSpellCooldown,
      // countdown time
      current: this.props.summonerSpellCooldown,
      isTicking: false,
      timer: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const initial = nextProps.summonerSpellCooldown;
    if (this.state.isTicking === false) {
      this.setState({
        initial: initial,
        current: initial
      });
    } else {
      this.setState({
        initial: initial
      });
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      BackgroundTimer.clearInterval(this.timer);
    }
  }

  onPress() {
    if (this.state.isTicking === false) {
      this.setState({
        isTicking: true
      });
      this.timer = BackgroundTimer.setInterval(this.tick, 100);
    } else if (this.timer) {
      BackgroundTimer.clearInterval(this.timer);
      this.setState({
        isTicking: false,
        current: this.state.initial
      });
    }
  }

  tick() {
    if (this.state.current <= 0) {
      BackgroundTimer.clearInterval(this.timer);
      this.setState({
        current: this.state.initial,
        isTicking: false
      });
    } else {
      const current = (this.state.current - 0.1).toFixed(1);
      this.setState({
        current: current
      });
    }
  }

  render() {
    return (
      <TouchableHighlight
        style = {this.state.isTicking ? styles.touchableIsTicking : styles.touchableNotTicking}
        onPress = {this.onPress}
        underlayColor='#e6e6e6'
      >
        <ImageBackground
          source = {{uri: this.props.summonerIconUrl}}
          style = {this.state.isTicking ? styles.imageIsTicking : styles.imageNotTicking}
          imageStyle = {this.state.isTicking ? {opacity: 0.7} : null}
        >
          <Text style = {styles.text} textShadowColor='black'>{this.state.current}</Text>
        </ImageBackground>
      </TouchableHighlight>
    );
  }
}

export default Button;
