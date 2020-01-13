import React from 'react';
import {} from 'antd';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";

const actions = combine(p5triActions, uiActions);

export class SandboxPage
    extends React.Component {

  componentDidMount() {
  }

  render = () => {
    console.log('>>>>>> page props', this.props);

    return <>
      <h2>hello there</h2>
    </>;
  }
}

SandboxPage.propTypes = {
  actions: PropTypes.object.isRequired,
  p5triParams: PropTypes.object,
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
)(SandboxPage);
