import { createStore } from 'vuex';
import authenticationModule from './authenticationModule';
import gameModule from './gameModule';
import toastModule from './toastModule';

export default createStore({
  modules: {
    authState: authenticationModule,
    gameState: gameModule,
    toastState: toastModule
  }
})
