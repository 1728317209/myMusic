import * as ActionTypes from '../const/ActionTypes';
import { MusicInfo } from './InitState';

export default function fetchMusicInfo(state = MusicInfo, action) {
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
    case ActionTypes.DELETE_MUSIC: {
      const { musicIds } = action;
      const newMusicIds = state.myMusic.myMusicList;
      musicIds.forEach(id => {
        const idx = newMusicIds.indexOf(id);
        if (idx !== -1) {
          newMusicIds.splice(idx, 1);
        }
      });
      return {
        ...state,
        myMusic: {
          ...state.myMusic,
          myMusicList: newMusicIds
        },
        selectedMusicIds: []
      };
    }
    case ActionTypes.RENAME_MUSIC: {
      const { id, newName } = action;
      return {
        ...state,
        musicEntities: {
          ...state.musicEntities,
          [id]: {
            ...state.musicEntities[id],
            name: newName
          }
        }
      };
    }
    case ActionTypes.CUT_MUSIC: {
      const { id, bmt, emt } = action;
      return {
        ...state,
        musicEntities: {
          ...state.musicEntities,
          [id]: {
            ...state.musicEntities[id],
            bmt,
            emt
          }
        }
      };
    }
    case ActionTypes.STORE_SELECTED_MUSIC: {
      return {
        ...state,
        selectedMusicIds: action.ids
      };
    }
    default:
      return state;
  }
}

