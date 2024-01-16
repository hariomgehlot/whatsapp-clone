const BASE_CONTEXT = 'http://localhost:3000';
const ROOM_CONTEXT = '/rooms';
const MESSAGE_CONTEXT = '/messages';
const WEB_SOCKET_URL = 'ws://localhost:3000/ws';

export const urlConstants = {
  GET_ALL_ROOMS: BASE_CONTEXT + ROOM_CONTEXT + '/getAllRooms',
  CREATE_NEW_ROOM: BASE_CONTEXT + ROOM_CONTEXT + '/create',
  GET_ALL_MESSAGES: BASE_CONTEXT + MESSAGE_CONTEXT + '/getAllMessages',
  WEB_SOCKET_URL: WEB_SOCKET_URL,
};
