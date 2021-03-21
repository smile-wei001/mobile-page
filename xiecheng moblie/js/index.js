window.addEventListener('load', function() {
    // alert('1');
    // 获取元素
    var fouce = document.querySelector('.fouce');
    // ul 进行滚动 并且它是 fouce 的 第一个孩子
    var ul = fouce.children[0];
    var ol = fouce.children[1];
    // 获得fouce 的宽度
    var w = fouce.offsetWidth;

    // 利用定时器自动轮播图 图片
    var index = 0;
    var flag = false;
    var timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            // 添加过渡效果
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000)
        // 等待 过渡 完成之后 再去判断 监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend', function() {
            // console.log('1');
            if (index >= 3) {
                index = 0;
                // 去掉过渡效果 快速跳回 至 目标位置
                ul.style.transition = 'none';
                // 利用 最新的 索引号 乘以 宽度 ，去滚动图片
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else if (index < 0) {
                index = 2;
                // 去掉过渡效果 快速跳回 至 目标位置
                ul.style.transition = 'none';
                // 利用 最新的 索引号 乘以 宽度 ，去滚动图片
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            // 小圆点 跟随变换
            // 把 lo 里面的li带有current 类名的选出来去掉类名 remove
            ol.querySelector('.current').classList.remove('current');
            // 让当前索引号 的小li 加上 current   add 
            ol.children[index].classList.add('current');
        })
        // 手指滑动 轮滑图
        // 触摸元素 touchstart  获取手指初始坐标
    var startx = 0;
    // 后面会使用这个变量，所以定义为全局变量
    var movex = 0;
    ul.addEventListener('touchstart', function(e) {
            startx = e.targetTouches[0].pageX;
            // 手指触摸的时候 就停止计时器
            clearInterval(timer);
        })
        // 移动手指 touchmove  计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function(e) {
            // 计算移动距离
            movex = e.targetTouches[0].pageX - startx;
            // 移动盒子： 盒子原来的位置+手指移动的距离
            var translatex = -index * w + movex;
            // 手指拖动时 是慢慢拖动的，不需要过渡效果
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translatex + 'px)';
            // 如果用户手指移动过 我们再去判断，否则不进行判断
            flag = true;
            e.preventDefault(); //阻止滚动屏幕的行为
        })
        // 手指离开 根据移动距离去判断是回弹还是播放上一张、下一张
    ul.addEventListener('touchend', function(e) {
            if (flag) {
                //如果移动距离大于50像素 我们就播放上一张或者下一张
                if (Math.abs(movex) > 50) {
                    //    如果是右划 就播放上一张 movex 是正值
                    if (movex > 0) {
                        index--;
                    } else {
                        //    如果是左划 就播放下一张 movex 是负值
                        index++;
                    }
                    var translatex = -index * w;
                    ul.style.transition = 'all .3s';
                    ul.style.transform = 'translateX(' + translatex + 'px)';
                } else {
                    // 如果移动距离小于50像素 我们就回弹
                    var translatex = -index * w;
                    ul.style.transition = 'all .3s';
                    ul.style.transform = 'translateX(' + translatex + 'px)';
                }
            }
            // 手指离开的时候，开启定时器
            // 先清除定时器，保证页面只有一个定时器在运行
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                var translatex = -index * w;
                // 添加过渡效果
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }, 2000)
        })
        // 返回顶部事件
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})