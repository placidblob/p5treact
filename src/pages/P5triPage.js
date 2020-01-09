import React from 'react';
import {Button, Radio, Tag} from 'antd';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'
import * as _ from 'lodash';

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
import {P5triComponent} from "../components/P5triComponent";

const actions = combine(p5triActions, uiActions);

const dish = require('../constants/dish.json');

export class P5triPage
    extends React.Component {

  componentDidMount() {
  }

  sendBeh = () => {
    // console.log('--- dish', dish);
    console.log('++++ sending', _.last(dish));
    this.props.actions.selectBehaviour(_.last(dish).behaviour);

    console.log('++++++', this.props);
  };

  renderEmpty =
    <span>
      <Tag color='lime'>beep</Tag>
      <Tag color='orange'>brrp</Tag>
      please load a behaviour.
      <Tag color='orange'>boing</Tag>
      <Tag color='lime'>doink</Tag>
     </span>;

  render = () => {
    console.log('>>>>>>', this.props);
    console.log('cccccc', dish);

    return <React.Fragment>
        {
          this.props.p5triParams && <div>
            <h2>{this.props.p5triParams.isRunning ? 'GOGOGOGOGO' : 'STOPSTOPSTOP'}</h2>

            <Button
              onClick={() => {
                this.props.actions.playPause();
              }}
              style={{width: '90px'}}
            >
              {this.props.p5triParams.isRunning ? '-------' : `>>>>>`}
            </Button>

            <P5triComponent
              p5triParams={this.props.p5triParams}
            />

        <div style={{ marginTop: 16 }}>
          <Radio.Group onChange={e => this.props.actions.selectBehaviour({behaviour: e.target.value})}>
            {
              dish.map((config, index) =>
                <Radio.Button
                  value={config.behaviour}
                  key={index}
                >
                  {config.title}
                </Radio.Button>
              )
            }
          </Radio.Group>
        </div>
          </div>
          || this.renderEmpty
        }
        <Button onClick={this.sendBeh}>beh</Button>
      </React.Fragment>;
  }
}

P5triPage.propTypes = {
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
)(P5triPage);
