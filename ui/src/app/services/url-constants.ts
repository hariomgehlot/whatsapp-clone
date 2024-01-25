const BASE_CONTEXT = 'http://localhost:3000';
const ROOM_CONTEXT = BASE_CONTEXT + '/rooms';
const MESSAGE_CONTEXT = BASE_CONTEXT + '/messages';
const WEB_SOCKET_URL = 'ws://localhost:3000/ws';
const USER_CONTEXT = BASE_CONTEXT + '/users';
export const urlConstants = {
  GET_ALL_ROOMS: ROOM_CONTEXT + '/getAllRooms',
  CREATE_NEW_ROOM: ROOM_CONTEXT + '/create',
  GET_ALL_MESSAGES: MESSAGE_CONTEXT + '/getAllMessages',
  WEB_SOCKET_URL: WEB_SOCKET_URL,
  USER_LOGIN: USER_CONTEXT + '/login',
  USER_CREATE: USER_CONTEXT + '/create',
  GET_ALL_USERS: USER_CONTEXT + '/getAllUsers',
};
