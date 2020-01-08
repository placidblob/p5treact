import React from 'react';
import {Button} from 'antd';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
const actions = combine(p5triActions, uiActions);

import * as p5tri from '../p5tri';
import {P5triComponent} from "../components/P5triComponent";

export class P5triPage
    extends React.Component {

  render = () =>
    this.props.p5triParams &&
    <div>
      <h2>{ this.props.p5triParams.isRunning? 'GOGOGOGOGO' : 'STOPSTOPSTOP' }</h2>

      <Button
        onClick={() => {
          this.props.actions.playPause();
        }}
        style={{width: '90px'}}
      >
        { this.props.p5triParams.isRunning? '-------' : `>>>>>` }
      </Button>

      <P5triComponent
      />

    </div>
    ||
    <span>bah!</span>;
}

P5triPage.propTypes = {
  actions: PropTypes.object.isRequired,
  p5triParams: PropTypes.object.isRequired,
  ui: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    p5triParams: state.p5triParams,
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
