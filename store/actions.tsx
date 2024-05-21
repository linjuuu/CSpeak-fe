export const setAccessToken = (accessToken: string) => {
    return {
      type: 'SET_ACCESS_TOKEN',
      payload: accessToken
    };
  };

export const setRefreshToken = (refreshToken: string) => {
    return {
      type: 'SET_REFRESH_TOKEN',
      payload: refreshToken
    };
  };
export const setUsername = (username: string) => {
    return {
      type: 'SET_USERNAME',
      payload: username
    };
  };

export const setSelfID = (selfID: string) => {
    return {
      type: 'SET_SELFID',
      payload: selfID
    };
  };

export const setCsID = (csID: string) => {
    return {
      type: 'SET_CSID',
      payload: csID
    };
  };

  export const setInitSelf = (initSelf: string) => {
    return {
      type: 'SET_INITSELF',
      payload: initSelf
    };
  };

export const setInitCS = (initCS: string) => {
    return {
      type: 'SET_INITCS',
      payload: initCS
    };
  };

export const setTopicCS = (topicCS: string) => {
  return {
    type: 'SET_TOPICCS',
    payload: topicCS
    };
  };