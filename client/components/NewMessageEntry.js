import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage } from '../store';


class NewMessageEntry extends Component {

  constructor () {
    super ()
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.write(event.target.value);
  }

  render () {
    console.log('this.props***', this.props);
    return (
      <form id="new-message-form">
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write: (input) => dispatch(writeMessage(input)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
