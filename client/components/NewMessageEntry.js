import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage, postNewMessageToServer } from '../store';


class NewMessageEntry extends Component {

  constructor () {
    super ()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.write(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault()

    const content = this.props.newMessageEntry;
    const channelId = this.props.channelId;
    const name = this.props.name;
    this.props.post({ content, channelId, name });
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.handleChange}
            value={this.props.newMessageEntry}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newMessageEntry: state.newMessageEntry,
    name: state.nameEntry,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write: (input) => dispatch(writeMessage(input)),
    post: (message) => dispatch(postNewMessageToServer(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
