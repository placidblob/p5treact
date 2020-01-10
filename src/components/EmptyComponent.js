import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";

const actions = combine(p5triActions, uiActions);

export class EmptyComponent
  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render = () => <></>;
}

EmptyComponent.propTypes = {
  example: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    example: state.example
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
)(EmptyComponent);
