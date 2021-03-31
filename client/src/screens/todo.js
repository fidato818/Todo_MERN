import React from "react";
import logo from "../128x128.gif";
// import fb from "../facebook-f.svg";
// import insta from "../instagram.svg";
// import twitter from "../twitter.svg";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { add_data, update_data, remove_user } from "../store/actions/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotificationSystem from "react-notification-system";
// import './App.css';
class Todo extends React.Component {
  notificationSystem = React.createRef();
  constructor() {
    super();
    this.state = {
      arr: [],
      modal: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggle = (id, title, content) => {
    this.setState({
      modal: !this.state.modal,
      editId: id,
      editTitle: title,
      editContent: content,
    });
  };

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDelete = (id) => {
    // console.log("id", id);
    // event.preventDefault();
    axios
      .delete(`https://todo818.herokuapp.com/Todo/${id}`)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        this.props.remove_data(id);
        const notification = this.notificationSystem.current;
        notification.addNotification({
          title: "M.E.R.N TODO",
          message: "Delete Successfully",
          level: "error",
          position: "tr",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  editTodo = () => {
    const { editId, editTitle, editContent } = this.state;
    var _id = editId;
    var obj = {
      // _id: editId,
      title: editTitle,
      content: editContent,
    };
    axios({
      method: "PUT",
      url: `https://todo818.herokuapp.com/Todo/${_id}`,
      data: obj,
      // headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        // console.log(res.data);
        this.props.update_Todo(res.data.result);
        this.setState({
          modal: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  addTodo = () => {
    const { title, content } = this.state;
    var obj = {
      title,
      content,
    };
    // console.log("obj", obj);
    if (title === undefined || content === undefined) {
      const notification = this.notificationSystem.current;
      notification.addNotification({
        title: "M.E.R.N TODO",
        message: "Please add Todo",
        level: "warning",
        position: "tr",
      });
    } else {
      // alert("success");
      axios({
        method: "POST",
        url: "https://todo818.herokuapp.com/Todo/addPost",
        data: obj,
        // headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          // console.log(res.data);
          this.props.add_Todo(res.data.result);
          const notification = this.notificationSystem.current;
          notification.addNotification({
            title: "M.E.R.N TODO",
            message: "Todo Add Successfully",
            level: "success",
            position: "bc",
          });
          this.setState({
            title: "",
            content: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.getData();
    // var ip = require("ip");
    // console.log(ip.address());
  }

  getData = () => {
    return fetch("https://todo818.herokuapp.com/Todo", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          arr: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    const { getReduxData } = this.props;
    return (
      <div className="App-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
          <a className="navbar-brand text-light" href="/">
            M.E.R.N TODO
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse  "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  href="https://adnan-ahmed.web.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  About Me
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container ">
          <div className="row mt-4 ">
            <div className="col-md-4 mb-4">
              <form>
                <div className="form-group ">
                  <label>Title</label>
                  <input
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                  {/* <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small> */}
                </div>
                <div className="form-group ">
                  <label>Content</label>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    name="content"
                    type="text"
                    value={this.state.content}
                    onChange={this.handleChange}
                  ></textarea>
                  {/* <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small> */}
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => this.addTodo()}
                  disabled={
                    this.state.title && this.state.content ? false : true
                  }
                >
                  Add Todo
                </button>
              </form>
            </div>

            <div className="col-md-8 mb-3 mb-md-0">
              <div className="row">
                {/* {getReduxData && getReduxData.length === 0 ? ( */}
                {getReduxData === undefined ? (
                  <div className="d-flex justify-content-center">
                    <div className="col-sm-6 mb-4">
                      <img
                        src={logo}
                        alt="logo"
                        style={{ height: 100, width: 100 }}
                      />
                    </div>
                  </div>
                ) : getReduxData.length > 0 ? (
                  getReduxData
                    .map((e, i) => {
                      // console.log(e.title);
                      return (
                        <div className="col-sm-6 mb-4" key={i}>
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">
                                {e.title && e.title}
                              </h5>
                              <p className="card-text">
                                {e.content && e.content}
                              </p>

                              <div className="d-flex justify-content-end ">
                                <button
                                  type="button"
                                  className="btn btn-success mr-1"
                                  onClick={() =>
                                    this.toggle(e._id, e.title, e.content)
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  href="#"
                                  className="btn btn-danger"
                                  onClick={() => this.handleDelete(e._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    .reverse()
                ) : (
                  <div class="d-flex p-2 bd-highlight offset-md-6 col-md-6 mb-3 mb-md-0">
                    <p className="justify-content-center align-items-center">
                      No Todo Available
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              //  className={className}
            >
              <ModalHeader toggle={this.toggle}>M.E.R.N TODO</ModalHeader>
              <ModalBody>
                <div className="form-group ">
                  <label for="exampleInputEmail1">Title</label>
                  <input
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="editTitle"
                    type="text"
                    value={this.state.editTitle}
                    onChange={this.handleChange}
                  />
                  {/* <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small> */}
                </div>
                <div className="form-group ">
                  <label for="exampleInputEmail1">Content</label>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    name="editContent"
                    type="text"
                    value={this.state.editContent}
                    onChange={this.handleChange}
                  ></textarea>
                  {/* <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.editTodo()}
                >
                  Edit Todo
                </button>
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        {/* <div className="fixed-bottom footer">
          <footer
            data-section-id="1"
            data-category="footers"
            data-component-id="2c0d_11_01_awz"
            className="py-3"
          >
            <div className="container-fluid ">
              <div className=" d-flex justify-content-between align-items-center flex-column flex-md-row border-bottom pb-2">
                <h5 className="ml-0 ml-md-3 mb-0">
                  <a
                    href="#"
                    data-config-id="brand"
                    style={{ textDecoration: "none" }}
                  >
                    M.E.R.N TODO
                  </a>
                </h5>
              </div>
              <div className="d-flex justify-content-center align-items-center justify-content-md-between flex-column flex-md-row mx-3 mt-3">
                <div className="d-flex" data-config-id="icons">
                  <a href="#">
                    <img className="mr-3" src={twitter} alt="" />
                  </a>
                  <a href="#">
                    <img className="mr-3" src={fb} alt="" />
                  </a>
                  <a href="#">
                    <img src={insta} alt="" />
                  </a>
                </div>
                <div className="d-flex mt-3 mt-md-0">
                  <p className="mb-0 small text-muted" data-config-id="copyright">
                    &copy; 2021 Adnan Ahmed. All right reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div> */}
        <NotificationSystem ref={this.notificationSystem} />
      </div>
    );
  }
}

// export default Todo;
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    getReduxData: state.data,
    // userR: state.user,
    // user: state.user,
    // userfb: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_Todo: (data) => dispatch(add_data(data)),
    update_Todo: (data) => dispatch(update_data(data)),
    remove_data: (data) => dispatch(remove_user(data)),
  };
};
// export default withStyles(styles)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Todo));
