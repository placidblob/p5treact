import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Card, Input, InputNumber, Switch, Slider} from 'antd';

import {combine} from '../utils'
import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
const actions = combine(p5triActions, uiActions);

import * as _ from 'lodash';

export class ConfigEditor
  extends React.Component {

  renderElement = (element, key) => {
    if(!key) {
      console.warn('config skipping:', element, key);

      return;
    }

    const onChange = val => this.props.actions.changeAttribute({key, value: val});

    switch (typeof element) {
      default:
        return <span>element</span>;
      case 'string':
      case 'number':
        if(Number.isInteger(element))
          return <InputNumber
            value={element}
            placeholder={key}
            style={{maxWidth: '80px'}}
            onChange={onChange}
          />;
        else
          return <Input
            value={element}
            placeholder={key}
            style={{maxWidth: '80px'}}
            onChange={onChange}
          />;
      case 'boolean':
        return <Switch
          checked={element}
          onChange={onChange}
        />;
    }
  };

  render = () =>
    <Card
      title={this.props.title || "Configuration"}
      size={this.props.indent? 'small' : 'default'}
      bodyStyle={{display: 'flex', flexDirection: 'column'}}
    >
      {
        _.map(_.keys(this.props.config), (k) => {
          if (_.keys(this.props.config[k]).length < 1)
            return <span
              className={'flexRow'}
              style={{justifyContent: 'space-between'}}
              key={k}
            >
              <span>{k}:</span>
              {this.renderElement(this.props.config[k], k)}
            </span>;

          return <ConfigEditor
            key={k}
            title={k}
            config={this.props.config[k]}
            indent={this.props.indent? this.props.indent + 1 : 1}
            parentKeys={this.props.parentKeys? _.union(this.props.parentKeys, [k]) : [k]}
            actions={this.props.actions}
          />;
        })
      }
    </Card>;
}

ConfigEditor.propTypes = {
  config: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired, // TODO?
  title: PropTypes.string,
  indent: PropTypes.number,
  parentKeys: PropTypes.arrayOf(PropTypes.string),
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
)(ConfigEditor);
