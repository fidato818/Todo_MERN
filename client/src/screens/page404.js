import React, { Component } from "react";

export default class page404 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        class=" d-flex flex-row align-items-center"
        style={{ background: " #dedede ", minHeight: "100vh" }}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12 text-center">
              <span class="display-1 d-block">404</span>
              <div class="mb-4 lead">
                The page you are looking for was not found.
              </div>
              <a href="https://adnan-ahmed.web.app" class="btn btn-link">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
