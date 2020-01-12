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
import globals from "../p5tri/globals";

export class P5triComponent
  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // stateSketch: (p) => p5tri.sketch(p, globals.nest)
      stateSketch: (p) => p5tri.sketch(p, globals.flock)
    };
  }

  componentDidMount() {
    console.log('++ P5triComponent didMount - props:', this.props);
  }

  render = () => {
    console.log('___ component props', this.props);

    return <P5Wrapper
      sketch={this.state.stateSketch}
      props={this.props.p5triParams}
    />;
  };
}

P5triComponent.propTypes = {
  p5triParams: PropTypes.object.isRequired,
  running: PropTypes.bool
};


function mapStateToProps(state) {
  console.log('--- mapStateToProps', state);

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
