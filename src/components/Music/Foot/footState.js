import * as imgs from '../../../Resource/Resource';

export const others = {
  other: null
};

export const footState = {
  current: 'play',
  list: ['play', 'rename', 'cut', 'share', 'delete'],
  entities: {
    play: {
      title: '播放',
      status: 'selected',
      img: {
        selected: imgs.button_new_play,
        unSelected: imgs.button_new_play_gray
      }
    },
    rename: {
      title: '重命名',
      status: 'unSelected',
      img: {
        selected: imgs.button_rename_red,
        unSelected: imgs.button_rename_gray
      }
    },
    cut: {
      title: '选取片段',
      status: 'unSelected',
      img: {
        selected: imgs.button_cut,
        unSelected: imgs.button_cut_gray
      }
    },
    share: {
      title: '送给朋友',
      status: 'unSelected',
      img: {
        selected: imgs.button_share,
        unSelected: imgs.button_share_gray
      }
    },
    delete: {
      title: '删除',
      status: 'unSelected',
      img: {
        selected: imgs.button_delete,
        unSelected: imgs.button_delete_gray
      }
    }
  }
};
