// import { combineReducers } from 'redux';
// import fetchMusicInfo from './fetchMusicInfo';
// import operateMusic from './operateMusic';

// export default combineReducers({
//   fetchMusicInfo,
//   operateMusic
// });

import * as ActionTypes from '../const/ActionTypes';
import { MusicInfo } from './InitState';

export function getNewMusicIds(ids1, ids2) {
  ids1.forEach(id => {
    const idx = ids2.indexOf(id);
    if (idx !== -1) {
      ids2.splice(idx, 1);
    }
  });
  return ids2;
}

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
      return {
        ...state,
        myMusic: {
          ...state.myMusic,
          myMusicList: getNewMusicIds(musicIds, state.myMusic.myMusicList)
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
      const { ids } = action;
      return {
        ...state,
        selectedMusicIds: ids
      };
    }
    default:
      return state;
  }
}

