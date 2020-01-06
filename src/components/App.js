import { NavLink, Route, Switch } from "react-router-dom";

import AboutPage from "./AboutPage";
import FuelSavingsPage from "./containers/FuelSavingsPage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import P5triPage from "./P5triPage";
import {combine} from '../utils'

import { Layout, Menu, Icon } from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

import * as p5triActions from "../actions/p5triActions";
import * as uiActions from "../actions/uiActions";
const actions = combine(p5triActions, uiActions);


const activeStyle = { color: 'blue' };

const renderHeader = () =>
  <Header style={{ background: '#fff', padding: 0 }}>
    Hello there
  </Header>;

const renderFooter = () => <Footer style={{ textAlign: 'center' }}>Remember what the dormouse said.</Footer>;

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

  renderSlider = () =>
    <Sider
      collapsible
      collapsed={this.props.ui.showMainSlider}
      onCollapse={this.props.actions.toggleMainSlider}
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <NavLink exact to="/" activeStyle={activeStyle}>p5tri</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="file" />
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>;

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>

        { this.renderSlider() }

        <Layout>
          { renderHeader() }
          { renderContent() }
          { renderFooter() }
        </Layout>
      </Layout>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  actions: PropTypes.object.isRequired,
  p5tri: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    p5tri: state.p5tri,
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
