import React from 'react';
import {Button} from 'antd';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
const actions = combine(p5triActions, uiActions);

export class P5triPage
    extends React.Component {

  render = () =>
    this.props.p5tri &&
    <div>
      <h2>{ this.props.p5tri.isRunning? 'GOGOGOGOGO' : 'STOPSTOPSTOP' }</h2>

      <Button
        onClick={() => {
          this.props.actions.playPause();
        }}
        style={{width: '90px'}}
      >
        { this.props.p5tri.isRunning? '-------' : `>>>>>` }
      </Button>
    </div>
    ||
    <span>bah!</span>;
}

P5triPage.propTypes = {
  actions: PropTypes.object.isRequired,
  p5tri: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    p5tri: state.p5tri,
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P5triPage);
