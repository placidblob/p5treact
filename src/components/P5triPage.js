import React from 'react';
import {Button} from 'antd';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'
import P5Wrapper from 'react-p5-wrapper';

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
const actions = combine(p5triActions, uiActions);

import * as p5tri from '../p5tri';

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

      <P5Wrapper
        sketch={p5tri.sketch}
      />

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
