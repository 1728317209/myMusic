import { normalize } from 'normalizr';
import * as ActionTypes from '../const/ActionTypes';
import * as Schema from '../schema/index';

export function add() {
  return {
    type: ActionTypes.ADD
  };
}

export function remove() {
  return {
    type: ActionTypes.REMOVE
  };
}

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
