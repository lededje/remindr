import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import 'moment-round';
import autobind from 'autobind-decorator';

import SliderInput from './SliderInput';

const deviceWidth = Dimensions.get('window').width;

const maxMacro = 14;
const maxMicro = 24;

export default class DeferDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      macro: 0,
      micro: 0,
    };
  }

  @autobind
  updateMacro(macro) {
    this.setState({ macro });
  }

  @autobind
  updateMicro(micro) {
    this.setState({ micro });
  }

  render() {
    const time = moment()
      .add(maxMacro * this.state.macro, 'days')
      .minutes(((maxMicro * this.state.micro) - 13) * 60);

    return (
      <View onPress={this.props.onClose} style={styles.container}>
        <View style={styles.dialog}>
          <Text style={styles.label}>{time.round(15, 'minutes').calendar(null, {
            sameElse: 'DD/MM/YYYY - hh:mm A',
          })}</Text>
          <SliderInput
            labels={['Near', 'Far']}
            onChange={this.updateMacro}
          />
          <SliderInput
            labels={['Morning', 'Evening']}
            onChange={this.updateMicro}
          />
        </View>
      </View>
    );
  }
}

DeferDialog.propTypes = {
  onClose: React.PropTypes.func,
  onTimeChosen: React.PropTypes.func,
  task: React.PropTypes.shape({
    id: React.PropTypes.number,
  }),
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  dialog: {
    borderRadius: 5,
    flexWrap: 'wrap',
    width: deviceWidth - 40,
    backgroundColor: '#fff',
    padding: 15,
  },
  label: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
