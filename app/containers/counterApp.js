import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';

@connect(
  state => ({
    state: state.counter,
  }),
  dispatch => ({
    actions: bindActionCreators(counterActions, dispatch),
  })
)
export default class CounterApp extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <Counter
        counter={state.count}
        {...actions}
      />
    );
  }
}

// export default connect(state => ({
//     state: state.counter
//   }),
//   (dispatch) => ({
//     actions: bindActionCreators(counterActions, dispatch)
//   })
// )(CounterApp);
