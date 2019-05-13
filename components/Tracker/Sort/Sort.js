import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';

class Row extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 20,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.championName}</Text>
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
        <View style={{height: 10}}/>
        <View>
          <Text style={styles.sortableListTitle}>Sort</Text>
        </View>
        <View style={{height: 10}}>
        </View>
        <View style={styles.sortableListWrap}>
          <SortableList
            changeRows = {this.props.changeRows}
            players = {this.props.players}
          />
        </View>
        <View style={{height: 10}}/>
        <View style={styles.sortableListWrap}>
          <Button
            onPress={this.props.finishSort.bind(this)}
            title="Done"
          />
        </View>
      </View>
    )
  }
}

export default Sort

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  sortableListWrap: {
    flex: 1,
    height: 100
  },
  sortableListTitle: {
    textAlign: 'center',
    fontSize: 24
  },
  doneWrap: {
    flex: 1
  }
});
