import * as imgs from '../../../Resource/Resource';

export const others = {
  other: null
};

export const tabBarBtnState = {
  current: 'mine',
  list: ['mine', 'search', 'upload'],
  entities: {
    mine: {
      title: '我的音乐',
      status: 'selected',
      img: {
        selected: imgs.my_music,
        unSelected: imgs.my_music_gray
      }
    },
    search: {
      title: '搜索音乐',
      status: 'unSelected',
      img: {
        selected: imgs.search,
        unSelected: imgs.search_gray
      }
    },
    upload: {
      title: '上传音乐',
      status: 'unSelected',
      img: {
        selected: imgs.upload,
        unSelected: imgs.upload_gray
      }
    }
  },
  classInfo: {
    selected: { spanClass: 'span-true', bottomClass: 'bottom-true' },
    unSelected: { spanClass: 'span-false', bottomClass: 'bottom-false' }
  }
};
