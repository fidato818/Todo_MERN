import React, { Component } from "react";
// import {} from "react-router"; // Note this extra line
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/************************* USERS SECTION ******************************/
import Home from "../screens/todo";
import NoMatch from "../screens/page404";

/************************* USERS SECTION ******************************/

import ScrollToTop from "react-router-scroll-top";
import { connect } from "react-redux";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      displayEmail: "",
    };
  }

  render() {
    // console.log("routes", this.props.user.user)

    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Navbar);
