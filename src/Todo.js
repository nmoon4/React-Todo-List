import React, { Component } from 'react'
import './Todo.css'

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("Todo comp did update");
  //   console.log(prevProps.task);
  //   console.log(this.props.task);
  // }

  componentWillUnmount() {
    console.log("comp unmount");
  }

  handleRemove() {
    this.props.removeTodo(this.props.id);
  }

  toggleForm() {
    this.setState({isEditing: !this.state.isEditing})
  }

  handleUpdate(evt) {
    evt.preventDefault();
    this.props.updateTodo(this.props.id, this.state.task)
    this.toggleForm();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleToggle(evt) {
    this.props.toggleTodo(this.props.id);
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div className="Todo">
          <form onSubmit={this.handleUpdate}>
            <input type="text" value={this.state.task} name="task" onChange={this.handleChange} />
            <button>Save</button>
          </form>
        </div>
      )
    } else {
      result = (
        <div className="Todo">
          <button onClick={this.toggleForm}>Edit</button>
          <button onClick={this.handleRemove}>X</button>
          <li className={this.props.completed ? "Todo-task completed" : "Todo-task"} onClick={this.handleToggle}>
            {this.props.task}
          </li>
        </div>
      )
    }

    return result;
  }
}
