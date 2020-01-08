import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'
import P5Wrapper from 'react-p5-wrapper';

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
const actions = combine(p5triActions, uiActions);

import * as p5tri from '../p5tri';

export const P5triComponent = () => {
  const zeParams = {
    isRunning: () => this.props.p5triParams.isRunning()
  };

  return <React.Fragment>
    <P5Wrapper
      sketch={p => p5tri.sketch(p, zeParams)}
    />
  </React.Fragment>;
};

P5triComponent.propTypes = {
  p5triParams: PropTypes.object.isRequired,
  running: PropTypes.bool
};


function mapStateToProps(state) {
  return {
    p5triParams: state.p5triParams
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
)(P5triComponent);
