import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ListView,
} from 'react-native';
import Task from './Task';

export default class TaskList extends Component {

  static propTypes = {
    tasks: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired,
      timestamp: React.PropTypes.number.isRequired,
    })).isRequired,
  }

  static defaultProps = {
    tasks: [],
  }

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  renderRow(task) {
    return (
      <Task id={task.id} title={task.title} timestamp={task.timestamp} />
    );
  }

  render() {
    const dataSource = this.dataSource.cloneWithRows(this.props.tasks);

    return (
      <View style={styles.container}>
        {this.props.tasks.length > 0 && (
          <ScrollView keyboardDismissMode="on-drag">
            <ListView
              ref={(lv) => { this.listView = lv; }}
              dataSource={dataSource}
              renderRow={this.renderRow}
            />
          </ScrollView>
        )}
        {this.props.tasks.length === 0 && (
          <Text style={styles.emptyMessage}>This list is empty</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
  },
});
