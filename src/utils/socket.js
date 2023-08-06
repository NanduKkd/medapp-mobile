import constants from './constants'
export const connectSocket = () => new WebSocket(constants.SOCKET_URL)
