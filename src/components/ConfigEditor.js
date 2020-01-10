import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Card, Input, InputNumber, Switch, Slider} from 'antd';

import * as _ from 'lodash';

export class ConfigEditor
  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  renderElement = (element, key) => {
    switch (typeof element) {
      default: return <span>element</span>;
      case 'string': return <Input value={element} placeholder={key}/>;
      case 'number': return Number.isInteger(element) &&
        <InputNumber value={element}/> ||
        <Slider
          value={element * 100}
          min={0} max={100} step={5}
          style={{minWidth: '80px'}}
        />;
      case 'boolean': return <Switch checked={element}/>;
    }
  };

  render = () => <Card
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
        />;
      })
    }
  </Card>;
}

ConfigEditor.propTypes = {
  config: PropTypes.object.isRequired,
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
