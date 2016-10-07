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
    onSwipe: React.PropTypes.func,
    onDefer: React.PropTypes.func,
    left: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
    }),
    right: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    tasks: [],
    onSwipe: () => undefined,
    onDefer: () => undefined,
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
          this.props.onSwipe(id, this.props.left.id);
          break;
        case 1:
          this.props.onSwipe(id, this.props.right.id);
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
        key={`${task.id}-${task.type}`}
        id={task.id}
        title={task.title}
        timestamp={task.timestamp}
        deferring={task.deferring}
        nextType={task.nextType}
        onDirectionDecided={this.onTaskDirectionDecided}
        onSwipeEnd={this.onTaskSwipeEnd}
        left={this.props.left}
        right={this.props.right}
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
