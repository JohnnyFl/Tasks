import React, { Component } from "react";
import { loadTasks } from "./Actions/taskActions";
import { connect } from "react-redux";
import Header from "./Components/Header";
import Routes from "./Components/Routes";

const mapDispatchToProps = {
  loadTasks
};

class App extends Component {
  componentDidMount = () => {
    this.props.loadTasks();
  };
  render() {
    return (
      <div>
        <Header />
        <Routes />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
