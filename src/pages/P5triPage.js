import React from 'react';
import {Button, Radio, Tag, Tabs} from 'antd';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {combine} from '../utils'

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
import {P5triComponent} from "../components/P5triComponent";
import {ConfigEditor} from "../components/ConfigEditor";

const { TabPane } = Tabs;

const actions = combine(p5triActions, uiActions);

const behaviours = require('../constants/behaviours.json');

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
        behaviours.map((behaviour, index) =>
          <Radio.Button
            value={behaviour}
            key={index}
          >
            {behaviour.title}
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
            {/*<h2>{this.props.p5triParams.isRunning ? 'GOGOGOGOGO' : 'STOPSTOPSTOP'}</h2>*/}

            <h2>p5tri dish</h2>

            <span
              className={'flexRow'}
              style={{justifyContent: 'space-between', alignItems: 'flex-start'}}
            >
              <span style={{marginTop: '5px'}} className={'flexCol'}>
                <P5triComponent
                  p5triParams={this.props.p5triParams}
                />

                <span className={'flexRow'} style={{alignItems: 'flex-start'}}>
                  <Button
                    onClick={() => {
                      this.props.actions.playPause();
                    }}
                    style={{width: '90px'}}
                  >
                    {this.props.p5triParams.isRunning ? 'STOP' : `START`}
                  </Button>

                  {this.renderBehaviourSelector()}
                </span>

              </span>

              <Tabs
                defaultActiveKey="1"
                onChange={c => console.log('tabs says', c)}
                size={'small'}
                style={{width: '100%', maxWidth: '400px'}}
              >
                <TabPane tab="behaviour" key="1">
                  <ConfigEditor
                    config={this.props.p5triParams.behaviour}
                    parentKey={'behaviour'}
                    actions={this.props.actions}
                    title={this.props.p5triParams.behaviour.title}
                  />
                </TabPane>
                <TabPane tab="world" key="2">
                  <ConfigEditor
                    config={this.props.p5triParams.dishConfig}
                    parentKey={'dishConfig'}
                    actions={this.props.actions}
                    title={this.props.p5triParams.dishConfig.title}
                  />
                  <Button onClick={this.props.actions.reset}>
                    reset!
                  </Button>
                </TabPane>
              </Tabs>
            </span>
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
