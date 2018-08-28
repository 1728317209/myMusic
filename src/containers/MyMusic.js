import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HandleActions from '../actions/index';
import Music from '../components/Music/Music';

class MyMusic extends React.Component {
  componentDidMount() {
    const { Actions } = this.props;
    Actions.fetchLoginInfo(101);
    Actions.fetchMyMusicInfo();
    Actions.fetchRecommendInfo();
  }

  render() {
    const {
      user,
      myMusic,
      recommendMusic,
      Actions,
      currentMusic,
      selectedMusicIds
    } = this.props;
    return (
      <div>
        <Music
          user={user}
          myMusic={myMusic}
          recommendMusic={recommendMusic}
          currentMusic={currentMusic}
          selectedMusicIds={selectedMusicIds}
          Actions={Actions}
        />
      </div>
    );
  }
}

const mergeEntities = (ids, entities) => { // 组装扁平化之后的数据
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
    musicEntities,
    selectedMusicIds
  } = state;

  const myMusicList = myMusic ? myMusic.myMusicList : null;
  return {
    user: mergeEntities(userMids, usersEntities),
    myMusic: {
      ...myMusic,
      myMusicList: mergeEntities(myMusicList, musicEntities)
    },
    recommendMusic: mergeEntities(recommendMusicList, musicEntities),
    currentMusic: selectedMusicIds.length ? musicEntities[selectedMusicIds[0]] : null,
    selectedMusicIds
  };
}
function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(HandleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusic);
