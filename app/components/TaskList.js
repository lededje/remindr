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
      timestamp: React.PropTypes.string.isRequired,
    })),
    onSwipe: React.PropTypes.func,
    onClose: React.PropTypes.func,
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
          this.props.onSwipe({ id, type: this.props.left.id });
          break;
        case 1:
          this.props.onSwipe({ id, type: this.props.right.id });
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
        key={`${task.id}`}
        id={task.id}
        title={task.title}
        type={task.type}
        timestamp={task.timestamp}
        deferredUntil={task.deferredUntil}
        completeTime={task.completeTime}
        deferring={task.deferring}
        onDirectionDecided={this.onTaskDirectionDecided}
        onSwipeEnd={this.onTaskSwipeEnd}
        onCloseEnd={this.props.onClose}
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
