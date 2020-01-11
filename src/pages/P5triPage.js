import React from 'react';
import {Button, Radio, Tag} from 'antd';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
import {P5triComponent} from "../components/P5triComponent";
import {ConfigEditor} from "../components/ConfigEditor";

const actions = combine(p5triActions, uiActions);

const dish = require('../constants/dish.json');

export class P5triPage
    extends React.Component {

  componentDidMount() {
  }

  renderEmpty =
    <span>
      <Tag color='lime'>beep</Tag>
      <Tag color='orange'>brrp</Tag>
      please load a behaviour.
      <Tag color='orange'>boing</Tag>
      <Tag color='lime'>doink</Tag>
     </span>;

  renderBehaviourSelector =  () => <span style={{ marginTop: 16 }}>
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
  </span>;

  render = () => {
    console.log('>>>>>> page props', this.props);

    return <>
        {
          this.props.p5triParams && <>
            <h2>{this.props.p5triParams.isRunning ? 'GOGOGOGOGO' : 'STOPSTOPSTOP'}</h2>

            <Button
              onClick={() => {
                this.props.actions.playPause();
              }}
              style={{width: '90px'}}
            >
              {this.props.p5triParams.isRunning ? '-------' : `>>>>>`}
            </Button>

            <span className={'flexRow'}>
              <P5triComponent
                p5triParams={this.props.p5triParams}
              />

              <ConfigEditor
                config={this.props.p5triParams}
                // TODO?
                actions={this.props.actions}
              />
            </span>
            {this.renderBehaviourSelector()}
          </>
          || this.renderEmpty
        }
      </>;
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
