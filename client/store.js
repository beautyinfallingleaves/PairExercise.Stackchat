import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';

const initialState = {
  messages: [],
  newMessageEntry: ''
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {...state, messages: [...state.messages, action.message]};
    case WRITE_MESSAGE:
      return {...state, newMessageEntry: action.newMessageEntry};
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
    const message = newMessage.data;
    const action = gotNewMessageFromServer(message)
    dispatch(action)
  }
}

const middleWares = applyMiddleware(thunkMiddleware, loggingMiddleware);
const store = createStore(reducer, middleWares);

export default store
