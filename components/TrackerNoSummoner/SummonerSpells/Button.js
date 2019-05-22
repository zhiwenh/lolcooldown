import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const styles = StyleSheet.create({
  notTicking: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  isTicking: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb3b3',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // color: 'white',
    // fontWeight: 'bold',
    // textShadowColor: 'black',
    // textShadowOffset: { width: 3, height: 3 },
    // textShadowRadius: 10
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
    if (nextProps.resetTimer === true) {
      BackgroundTimer.clearInterval(this.timer);
      const initial = nextProps.summonerSpellCooldown;
      this.setState({
        initial: initial,
        current: initial,
        isTicking: false
      });
      this.props.changeResetTimer(this.props.page, this.props.row, this.props.col);
      return;
    }

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
        style = {this.state.isTicking ? styles.isTicking : styles.notTicking}
        onPress = {this.onPress}
        underlayColor='#e6e6e6'
      >
        <Text style = {styles.text} textShadowColor='black'>{this.state.current}</Text>
      </TouchableHighlight>
    );
  }
}

export default Button;
