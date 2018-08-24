import * as ActionTypes from '../const/ActionTypes';
import { MusicInfo } from './InitState';

export default function operateMusic(state = MusicInfo, action) {
  switch (action.type) {
    // case `${ActionTypes.FETCH_LOGIN_INFO}_SUC`: {
    //   return {
    //     ...state,
    //     userMids: [
    //       ...state.userMids,
    //       action.response.User.result
    //     ],
    //     usersEntities: {
    //       ...state.usersEntities,
    //       ...action.response.User.entities.UserEntities
    //     }
    //   };
    // }
    default:
      return state;
  }
}

