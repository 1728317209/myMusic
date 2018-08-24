import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HandleActions from '../actions/index';
import Music from '../components/Music/Music';

class MyMusic extends React.Component {
  state = {

  };

  componentDidMount() {
    const { Actions } = this.props;
    Actions.fetchLoginInfo(101);
    Actions.fetchMyMusicInfo('test80031');
    Actions.fetchRecommendInfo('test80031');
  }
  render() {
    const {
      user,
      myMusic,
      recommendMusic,
      Actions
    } = this.props;
    return (
      <div>
        <Music
          user={user}
          myMusic={myMusic}
          recommendMusic={recommendMusic}
          Actions={Actions}
        />
      </div>
    );
  }
}

const mergeEntities = (ids, entities) => {
  if (ids && ids.length) {
    return ids.map(id => entities[id]);
  }
  return null;
};

function mapStateToProps(state) {
  const {
    userMids,
    usersEntities,
    myMusic,
    recommendMusicList,
    musicEntities
  } = state;

  const myMusicList = myMusic ? myMusic.myMusicList : null;
  return {
    user: mergeEntities(userMids, usersEntities),
    myMusic: {
      ...myMusic,
      myMusicList: mergeEntities(myMusicList, musicEntities)
    },
    recommendMusic: mergeEntities(recommendMusicList, musicEntities)
  };
}
function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(HandleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusic);