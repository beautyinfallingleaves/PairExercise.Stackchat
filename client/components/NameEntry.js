import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeNameEntry } from '../store'
import { withRouter } from 'react-router-dom'

class NameEntry extends Component {
  constructor() {
    super()
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(event) {
    this.props.changeName(event.target.value)
  }

  render() {
      return (
      <form className='form-inline'>
        <label htmlFor='name'>Your Name:</label>
        <input
          type='text'
          name='name'
          placeholder='Enter your name'
          className='form-controsl'
          onChange={this.handleNameChange}
          value={this.props.nameEntry}
        />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nameEntry: state.nameEntry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeName: (name) => dispatch(changeNameEntry(name))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NameEntry))
