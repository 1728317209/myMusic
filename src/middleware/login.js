let NotReadyActions = [];

/* eslint-disable no-unused-vars */
export default store => next => action => {
  if (!action.SERVER_API) {
    return next(action);
  }
  const {
    type,
    params
  } = action.SERVER_API;

  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }

  const getToken = data => {
    NotReadyActions.forEach(item => {
      const newAction = item;
      newAction.SERVER_API.params.token = data.token;
      next(newAction);
    });
    NotReadyActions = [];
  };

  return new Promise((resolve, reject) => {
    if (Object.keys(params).includes('token') && !params.token) {
      NotReadyActions.push(action);
      return reject(new Error('No token'));
    }
    if (type === 'FETCH_LOGIN_INFO') {
      const newAction = action;
      newAction.SERVER_API.params.getToken = getToken;
      return resolve(newAction);
    }
    return resolve(action);
  }).then(action => {
    next(action);
  }).catch(err => {
    next({
      type: `${type}_FAI`,
      errMsg: err.message
    });
  });
};
