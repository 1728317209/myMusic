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
      img: {
        active: imgs.button_new_play,
        notActive: imgs.button_new_play_gray
      }
    },
    rename: {
      title: '重命名',
      img: {
        active: imgs.button_rename_red,
        notActive: imgs.button_rename_gray
      }
    },
    cut: {
      title: '选取片段',
      img: {
        active: imgs.button_cut,
        notActive: imgs.button_cut_gray
      }
    },
    share: {
      title: '送给朋友',
      img: {
        active: imgs.button_share,
        notActive: imgs.button_share_gray
      }
    },
    delete: {
      title: '删除',
      img: {
        active: imgs.button_delete,
        notActive: imgs.button_delete_gray
      }
    }
  }
};
