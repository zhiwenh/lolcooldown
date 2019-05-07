import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1.5,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
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
      initial: this.props.spellCd,
      // countdown time
      current: this.props.spellCd,
      isTicking: false,
      timer: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const initial = nextProps.spellCd;
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

  onPress() {
    if (this.state.isTicking === false) {
      this.setState({
        isTicking: true
      });
      this.timer = setInterval(this.tick, 100);
    } else if (this.timer) {
      clearInterval(this.timer);
      this.setState({
        isTicking: false,
        current: this.state.initial
      });
    }
  }

  tick() {
    if (this.state.current <= 0) {
      this.state.isTicking = false;
      clearInterval(this.timer);
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
        style = {styles.main}
        onPress = {this.onPress}
      >
        <Text>{this.state.current}</Text>
      </TouchableHighlight>
    );
  }
}

export default Button;
