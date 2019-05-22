import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';

class Row extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 13,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <View style={{flex: 1, flexDirection: 'row', alignment: 'center'}}>
          <Image
            style={{height: 30, width: 30}}
            source={{uri: this.props.data.championIconUrl}}
          />
          <Text style={{paddingLeft: 10}}>{this.props.data.championName}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

class SortableList extends Component {
  render() {
    return (
      <SortableListView
        style={{ flex: 1 }}
        data={this.props.players}
        order={Object.keys(this.props.players)}
        onRowMoved={e => {
          const players = this.props.players;
          const order = Object.keys(players);
          order.splice(e.to, 0, order.splice(e.from, 1)[0]);
          const newPlayers = {};
          for (let i = 0; i < order.length; i++) {
            newPlayers[i] = players[order[i]];
          }
          this.props.changeRows(newPlayers);
        }}
        renderRow={row => <Row data={row} />}
      />
    )
  }
}

class Sort extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={{height: 13}}/>
        <View>
          <Text style={styles.sortableListTitle}>Sort Opponents</Text>
        </View>
        <View style={{height: 13}}>
        </View>
        <View style={styles.sortableListWrap}>
          <SortableList
            changeRows = {this.props.changeRows}
            players = {this.props.players}
          />
        </View>
        <View style={{height: 10}}/>
        <View style={styles.sortableListWrap}>
          <View style={styles.buttonWrap}>
            <TouchableOpacity
              onPress={this.props.finishSort.bind(this)}
              style={styles.button}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#e6e6e6'
  },
  sortableListWrap: {
    flex: 1.5
  },
  sortableListTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  buttonWrap: {
    alignItems: 'center',
    flex: 1
  },
  button: {
    width: 100,
    height: 50,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16
  }
});

export default Sort;
