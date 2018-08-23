import * as ActionTypes from '../const/ActionTypes';
import { MusicInfo } from './InitState';

export default function MyMusic(state = MusicInfo, action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_LOGIN_INFO}_SUC`: {
      return {
        ...state,
        userMids: [
          ...state.userMids,
          action.response.User.result
        ],
        usersEntities: {
          ...state.usersEntities,
          ...action.response.User.entities.UserEntities
        }
      };
    }
    case `${ActionTypes.FETCH_MY_MUSIC_LIST_INFO}_SUC`: {
      return {
        ...state,
        myMusic: {
          ...action.response.Other,
          myMusicList: [
            ...state.myMusic.myMusicList,
            ...action.response.Music.result
          ]
        },
        musicEntities: {
          ...state.musicEntities,
          ...action.response.Music.entities.musicEntities
        }
      };
    }
    case `${ActionTypes.FETCH_RECOMMEND_LIST_INFO}_SUC`: {
      return {
        ...state,
        recommendMusicList: [
          ...state.recommendMusicList,
          ...action.response.Music.result
        ],
        musicEntities: {
          ...state.musicEntities,
          ...action.response.Music.entities.musicEntities
        }
      };
    }
    default:
      return state;
  }
}

