import { normalize } from 'normalizr';
import * as ActionTypes from '../const/ActionTypes';
import * as Schema from '../schema/index';

export function fetchLoginInfo(mid) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_LOGIN_INFO,
      endpoint: '/login',
      params: {
        mid
      },
      normalizeFuc: json => ({
        User: normalize(json, Schema.UserSchema)
      })
    }
  };
}

export function fetchMyMusicInfo(token) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_MY_MUSIC_LIST_INFO,
      endpoint: '/music/my_list',
      params: {
        token
      },
      normalizeFuc: json => ({
        Music: normalize(json.list, Schema.musicListSchema),
        Other: { e: json.e, plp_unread: json.plp_unread, total: json.total }
      })
    }
  };
}

export function fetchRecommendInfo(token) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_RECOMMEND_LIST_INFO,
      endpoint: '/music/recommend_list',
      params: {
        token
      },
      normalizeFuc: json => ({
        Music: normalize(json.list, Schema.musicListSchema)
      })
    }
  };
}

export function deleteMusic(musicIds) {
  return {
    type: ActionTypes.DELETE_MUSIC,
    musicIds
  };
}

export function renameMusic(id, newName) {
  return {
    type: ActionTypes.RENAME_MUSIC,
    id,
    newName
  };
}

export function cutMusic(id, bmt, emt) {
  return {
    type: ActionTypes.CUT_MUSIC,
    id,
    bmt,
    emt
  };
}

export function storeSelectedMusic(ids) {
  return {
    type: ActionTypes.STORE_SELECTED_MUSIC,
    ids
  };
}
