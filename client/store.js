import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios'
import socket from './socket'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const CHANGE_NAME_ENTRY = 'CHANGE_NAME_ENTRY'

const initialState = {
  messages: [],
  newMessageEntry: '',
  nameEntry: '',
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {...state, messages: [...state.messages, action.message]};
    case WRITE_MESSAGE:
      return {...state, newMessageEntry: action.newMessageEntry};
    case CHANGE_NAME_ENTRY:
      return {...state, nameEntry: action.nameEntry};
    default : return state;
  }
}

export const gotMessagesFromServer = (messages) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
  }
}

export const writeMessage = (inputContent) => {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent
  }
}

export const gotNewMessageFromServer = (message) => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message: message
  }
}

export const fetchMessages = () => {
  return  async (dispatch) => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = gotMessagesFromServer(messages)
    dispatch(action)
  }
}

export const postNewMessageToServer = (message) => {
  return  async (dispatch) => {
    const newMessage = await axios.post('/api/messages', message);
    const newMessageData = newMessage.data;
    const action = gotNewMessageFromServer(newMessageData)
    dispatch(action)
    socket.emit('new-message', newMessageData)
  }
}

export const changeNameEntry = (name) => {
  return {
    type: CHANGE_NAME_ENTRY,
    nameEntry: name,
  }
}

const middleWares = applyMiddleware(thunkMiddleware, loggingMiddleware);
const store = createStore(reducer, middleWares);

export default store
