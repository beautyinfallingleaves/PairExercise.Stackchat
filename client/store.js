import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

const initialState = {
  messages: []
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages };
    default : return state;
  }
}

export const gotMessagesFromServer = (messages) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
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

const middleWares = applyMiddleware(thunkMiddleware, loggingMiddleware);
const store = createStore(reducer, middleWares);

export default store
