import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { addTask, editTask } from "../Actions/taskActions";
import { connect } from "react-redux";

const mapDispatchToProps = {
  addTask,
  editTask
};

const mapStateToProps = ({ isAdmin }) => {
  return {
    isAdmin
  };
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class AddForm extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    email: this.props.email,
    task: this.props.task,
    status: this.props.status
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClick = event => {
    const {id, name, email, task, status } = this.state;
    const { addTask, editTask, isAdmin } = this.props;
    if (name !== "" && email !== "" && task !== "" && isAdmin === false) {
      event.preventDefault();
      addTask(name, email, task);
      this.setState({ name: "", email: "", task: "" });
    } else if (isAdmin) {
      event.preventDefault();
      editTask(id, name, email, task, status);
      this.setState({id: "", name: "", email: "", task: "", status: "" });
    }
  };

  render() {
    const { classes, isAdmin } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Username"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          id="standard-name"
          label="E-mail"
          type="email"
          name="email"
          autoComplete="email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange("email")}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          id="standard-name"
          label="Task"
          className={classes.textField}
          value={this.state.task}
          onChange={this.handleChange("task")}
          margin="normal"
          variant="outlined"
          required
        />
        {isAdmin ? (
          <TextField
            id="standard-name"
            label="Status"
            className={classes.textField}
            value={this.state.status}
            onChange={this.handleChange("status")}
            margin="normal"
            variant="outlined"
          />
        ) : null}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignSelf: "center"
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleClick}
          >
            {isAdmin === false ? "Add" : "Edit"} Task
          </Button>
        </div>
      </form>
    );
  }
}

AddForm.propTypes = {
  classes: PropTypes.object.isRequired
};

AddForm.defaultProps = {
  id: "",
  name: "",
  email: "",
  task: "",
  status: ""
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddForm));
