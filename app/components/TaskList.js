import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
} from 'react-native';
import autobind from 'autobind-decorator';
import Task from './Task';

export default class TaskList extends Component {

  static propTypes = {
    tasks: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired,
      timestamp: React.PropTypes.number.isRequired,
    })),
    onSwipeLeft: React.PropTypes.func,
    onSwipeRight: React.PropTypes.func,
  }

  static defaultProps = {
    tasks: [],
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  }

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  @autobind
  onTaskDirectionDecided({ direction }) {
    if (direction === 'x') {
      this.listView.setNativeProps({ scrollEnabled: false });
    }
  }

  @autobind
  onTaskSwipeEnd({ id, direction }) {
    this.listView.setNativeProps({ scrollEnabled: true });

    return new Promise((resolve, reject) => {
      switch (direction) {
        case -1:
          this.props.onSwipeLeft(id);
          break;
        case 1:
          this.props.onSwipeRight(id);
          break;
        case 0:
        default:
          reject(); // Reject will cause the task to reset. (The swipe failed)
          break;
      }
    });
  }

  @autobind
  renderRow(task) {
    return (
      <Task
        id={task.id}
        title={task.title}
        timestamp={task.timestamp}
        nextType={task.nextType}
        onDirectionDecided={this.onTaskDirectionDecided}
        onSwipeEnd={this.onTaskSwipeEnd}
      />
    );
  }

  render() {
    const dataSource = this.dataSource.cloneWithRows(this.props.tasks);

    return (
      <View style={styles.container}>
        {this.props.tasks.length > 0 && (
          <ListView
            ref={(lv) => { this.listView = lv; }}
            dataSource={dataSource}
            renderRow={this.renderRow}
          />
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
