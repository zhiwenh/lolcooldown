import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import SpellRow from './SpellRow';

// props: players
// prop methods: startSpellTimer, stopSpellTimer

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  rowWrap: {
    flex: 1,
    backgroundColor: 'white'
  },
  championNameWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    backgroundColor: '#595959',
  },
  championName: {
    fontWeight: 'bold',
    color: 'white'
  }
});

class Spells extends Component {
  render() {
    const spellRows = [];
    const keys = Object.keys(this.props.players);
    for (var i = 0; i < keys.length; i++) {
      spellRows.push(
        <View style={styles.rowWrap} key={i}>
          <View style={styles.championNameWrap}>
            <Text style={styles.championName}>
              {this.props.players[i].championName}
            </Text>
          </View>
          <SpellRow
            row = {i}
            name = {this.props.userSummonerName} // I dont think this is being used
            spells = {this.props.players[i].spells}
            spellNames = {this.props.players[i].spellNames}
            spellIconUrls = {this.props.players[i].spellIconUrls}
            player = {this.props.players[i]}
          />
        </View>
      );
    }
    return (
      <View style={styles.main}>
        {spellRows}
      </View>
    );
  }
}

export default Spells;



// const SpellIcon = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.spellIconCon}>
//         <Text>SpellIcon</Text>
//       </View>
//     );
//   }
// });
//
// const SpellInfo = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.spellCdCon}>
//         <Text>{this.props.spellName}</Text>
//         <Text>{this.props.spellCd}</Text>
//       </View>
//     );
//   }
// });
//
// // row, col, cooldown, spellCds, spellName, level
// // prop methods: startSpellTimer, stopSpellTimer
// const SpellButton = React.createClass({
//   getInitialState: function() {
//     this.timer;
//     return ({
//       // initial spell cooldown with level and cd % adjustment
//       // initial: this.props.spellCds[this.props.level],
//       initial: 0,
//       // countdown time
//       current: 0,
//       isTicking: false,
//       timer: null
//     });
//   },
//   componentWillReceiveProps: function(nextProps) {
//     const initial = nextProps.spellCd.toFixed(1);
//     if (this.state.isTicking === false) {
//       this.setState({
//         initial: initial,
//         current: initial
//       });
//     } else {
//       this.setState({
//         initial: initial
//       });
//     }
//
//   },
//   onPress: function(event) {
//     if (this.state.isTicking === false) {
//       this.setState({
//         isTicking: true
//       });
//       this.timer = setInterval(this.tick, 100);
//     } else if (this.timer) {
//       clearInterval(this.timer);
//       this.setState({
//         isTicking: false,
//         current: this.state.initial
//       });
//     }
//   },
//   tick: function() {
//     if (this.state.current <= 0) {
//       this.state.isTicking = false;
//       clearInterval(this.timer);
//       this.setState({
//         current: this.state.initial,
//         isTicking: false
//       });
//     } else {
//       const current = (this.state.current - 0.1).toFixed(1);
//       this.setState({
//         current: current
//       });
//     }
//   },
//   render: function() {
//     return (
//       <TouchableHighlight
//         style = {styles.spellButtonCon}
//         onPress = {this.onPress}
//       >
//         <Text>{this.state.current}</Text>
//       </TouchableHighlight>
//     );
//   }
// });
//
// // props key, row, col, cooldown, spellCds, spellName, level
// // prop methods: startSpellTimer, stopSpellTimer
// const SpellButtonWrap = React.createClass({
//   render: function() {
//     var spellCd = this.props.spellCds[this.props.level];
//     spellCd = spellCd - spellCd * this.props.cooldown;
//     return (
//       <View style={styles.spellButtonWrap}>
//         <SpellInfo
//           row = {this.props.row}
//           col = {this.props.col}
//           spellCd = {spellCd}
//           spellName = {this.props.spellName}
//         />
//         <SpellButton
//           row = {this.props.row}
//           col = {this.props.col}
//           spellCd = {spellCd}
//           startSpellTimer = {this.props.startSpellTimer}
//           stopSpellTimer = {this.props.stopSpellTimer}
//         />
//       </View>
//     );
//   }
// });
//
// // props: key, row, spells, spellNames
// // prop methods: startSpellTimer, stopSpellTimer
// const SpellRow = React.createClass({
//   render: function() {
//     const spellButtonWraps = [];
//     for (var i = 0; i < 4; i++) {
//       spellButtonWraps.push(<SpellButtonWrap
//         key = {i}
//         row = {this.props.row}
//         col = {i}
//         spellCds = {this.props.spells.data1[i]}
//         level = {this.props.spells.levels[i]}
//         cooldown = {this.props.spells.cooldown}
//         spellName = {this.props.spellNames.data1[i]}
//         startSpellTimer = {this.props.startSpellTimer}
//         stopSpellTimer = {this.props.stopSpellTimer}
//       />);
//     }
//     return (
//       <View style={styles.spellRowCon}>
//         <View>
//           <Text>{this.props.name}</Text>
//         </View>
//         {spellButtonWraps}
//       </View>
//     );
//   }
// });

//
// spellRowCon: {
//   flex: 1,
//   flexDirection: 'row',
//   backgroundColor: 'powderblue',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// },
//
// spellIconCon: {
//
// },
//
// spellButtonWrap: {
//   borderWidth: 1,
// },
//
// spellButtonCon: {
//   width: 75,
//   height: 75,
//   backgroundColor: '#eee',
//   justifyContent: 'center',
//   alignItems: 'center'
// },
//
// spellCdCon: {
//
// }
