import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Card, InputNumber, Input, Switch} from 'antd';
import * as _ from 'lodash';

import {combine} from '../utils'
import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";

const actions = combine(p5triActions, uiActions);

export class ConfigEditor
  extends React.Component {

  renderElement = (element, key) => {
    if(!key) {
      console.warn('config skipping:', element, key);

      return;
    }

    const onChange = (val) => this.props.actions.changeAttribute({key, value: val});

    switch (typeof element) {
      default:
        return <span>element</span>;
      case 'string':
        return <Input
          value={element}
          placeholder={key}
          style={{maxWidth: '80px'}}
          onChange={onChange}
        />;
      case 'number':
        // if(Number.isInteger(element))
          return <InputNumber
            value={element}
            placeholder={key}
            style={{maxWidth: '80px'}}
            onChange={onChange}
            step={Number.isInteger(element)? 1 : 0.1} // I know..
            min={0} max={Number.isInteger(element)? 100 : 1}
          />;
        // else
        //   return <Slider
        //     value={element}
        //     placeholder={key}
        //     style={{minWidth: '80px'}}
        //     onChange={onChange}
        //     step={Number.isInteger(element)? 1 : 0.1} // I know..
        //     min={0.1} max={Number.isInteger(element)? 100 : 0.9}
        //   />;
      case 'boolean':
        return <Switch
          checked={element}
          onChange={onChange}
        />;
    }
  };

  render = () => <span style={{marginTop: '5px'}}>
    <Card
      title={this.props.title || "Configuration"}
      size={this.props.indent? 'small' : 'default'}
      bodyStyle={{display: 'flex', flexDirection: 'column'}}
      // headStyle={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
    >
      {
        _.map(_.keys(this.props.config), (k) => {
          if (_.keys(this.props.config[k]).length < 1 || typeof this.props.config[k] === 'string')
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
    </Card>
  </span>;
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
