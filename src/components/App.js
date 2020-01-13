import { NavLink, Route, Switch } from "react-router-dom";

import AboutPage from "../pages/demo/AboutPage";
import FuelSavingsPage from "../pages/demo/FuelSavingsPage";
import NotFoundPage from "../pages/demo/NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import P5triPage from "../pages/P5triPage";
import {combine} from '../utils'
import * as dishType from '../constants/dishTypes';

import { Layout, Menu, Icon } from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
const actions = combine(p5triActions, uiActions);

const renderFooter = () => <Footer className='footer'>Remember what the dormouse said.</Footer>;

const renderContent = () =>
  <Content style={{ margin: '0 16px' }}>

    <Switch>
      <Route exact path="/" component={P5triPage} />
      <Route path="/fuel-savings" component={FuelSavingsPage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFoundPage} />
    </Switch>

  </Content>;


class App
    extends React.Component {

  renderHeader = <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1" onClick={() => {this.props.actions.selectP5triType(dishType.BALLS)}}>balls</Menu.Item>
      <Menu.Item key="2" onClick={() => {this.props.actions.selectP5triType(dishType.ANTS)}}>ants</Menu.Item>
    </Menu>
  </Header>;

  renderSlider = () => {
    const activeStyle = { color: 'tomato' };

    return <Sider
      collapsible
      collapsed={this.props.ui.showMainSlider}
      onCollapse={this.props.actions.toggleMainSlider}
    >
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Icon type="fire"/>
          <NavLink exact to="/" activeStyle={activeStyle}>p5tri</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="coffee"/>
          <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="bug"/>
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>;
  };

  render = () =>
    <Layout style={{ minHeight: '100vh' }}>
      { this.renderHeader }
      <Layout>
        { this.renderSlider() }
        <Layout style={{marginTop: '10px'}}>
          { renderContent() }
          { renderFooter() }
        </Layout>
      </Layout>
    </Layout>;
}

App.propTypes = {
  children: PropTypes.element,
  actions: PropTypes.object.isRequired,
  p5triParams: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
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

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
