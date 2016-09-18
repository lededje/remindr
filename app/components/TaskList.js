import React, { Component } from 'react';
import Task from './Task';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';

export default class List extends Component {

  static propTypes = {
    tasks: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired,
      timestamp: React.PropTypes.number.isRequired,
    })).isRequired,
  };

  static defaultProps = {
    tasks: [],
  }

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  renderRow(task) {
    return (
      <Task {...task} />
    );
  }

  render() {
    const dataSource = this.dataSource.cloneWithRows(this.props.tasks);

    return (
      <View style={styles.container}>
        <ListView
          ref={(lv) => { this.listView = lv; }}
          dataSource={dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
