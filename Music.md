# 结营作业(二)

1、store：
* 接口中拉取的数据(扁平化后)
* selectedMusicIds[]：存储当前选中的音乐

2、reducer拆分：
* 本次作业中，并没有拆分reducer。
* 因为store中并不存储UI相关数据，reducer并不控制UI，reducer处理的action类型相同且量不大。
* action也没拆

3、组件结构
![1](./helpImg/Music.png)
* 除了Head都可以看作是TabBar的子组件
* Message：消息提示组件，在Cut、Foot、MusicList部分都有用到
* Selection：单选和多选组件
* ProgressDemo组件：Cut组件和Play组件中的进度条部分复用ProgressDemo
* MusicListDemo组件：在MusicList组件中调用两次，分别传入我的音乐和推荐音乐相关信息

4、TabBar组件
* state：

![2](./helpImg/TabBarState.png)
* 方法：修改以上属性的方法
* 将这些属性和方法传给子组件，控制页面渲染。某个子组件修改数据后，兄弟组件也会同步

5、Cut组件
* Cut组件需要知道ProgressDemo组件的audio的当前时间
* 调用ProgressDemo组件，传入bmt、emt、以及获取audio当前时间的回调函数。

6、ProgressDemo组件
* state:

![2](./helpImg/ProgressDemoState.png)
* currentTime记录当前播放进度，结合props的bmt和emt，调整进度条宽度和歌曲进度。
* currentWidth、marginLeft控制进度条的样式，由currentTime计算得到，或由点击、拖动的位置计算得到。
* onTouch。拖动开始，暂停播放。拖动过程中不改变音乐播放进度，只改变进度条宽度。拖动结束，修改音乐播放进度，开始播放。
* 拖动过程中，计算起点的宽度要根据currentTime来算，不能根据currentWidth计算。

7、login中间件
* 作用：过滤action
* 位置：serverApi之前
* 将有Token这个参数，但还没有赋值的action拦截下来，存入一个数组。Object.keys(params).includes('token') && !params.token。
* 给拉去个人信息的action中增加一个回调函数，next到serverApi。拉到信心后执行回调函数，login就得到了Token。
* 将得到的Token赋给被拦截的action中，next。

4、问题
* Message组件的显示or隐藏问题
* 进度条标记起点和清除标记时有一点点的延时


aaa
bbb
444
AAA
AAA
BBB
CCC
DDD