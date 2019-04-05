var util = {

    init: function (isRoot) {
        auto();
        var utilsMap = {};
        toast('初始化');
        this.registerStopEvent();
        //add by wangguangbin，此文件可使用import方式导入使用
        utilsMap.width = device.width; //设备的宽
        utilsMap.height = device.height; //设备的高

        console.show();
        //通过名字||包名，启动app
        utilsMap.startAPP = function (name) {
            var isHasApp = launchApp(name);
            if (!isHasApp) {
                toast('手机未安装：' + name);
            } else {
                //设置屏幕缩放
                setScreenMetrics(1080, 1920);
                sleep(5000); //停顿5s
                var dom_allow = this.findDomByText('允许');
                if (dom_allow) {
                    dom_allow.click();
                }
            }
            return isHasApp;
        };
        //通过包名，关闭app
        utilsMap.closeApp = function (packageName) {
            try {
                packageName = packageName || currentPackage();
                var result = app.openAppSetting(packageName);
                if (result) {
                    sleep(2000);
                    this.findDomByText('结束运行').click();
                    sleep(1000);
                    this.findDomByText('确定').click();
                    home();
                    sleep(200);
                    home();
                }
            } catch (ex) {
                home();
                sleep(200);
                home();
            }
        };
        //通过id，查找dom
        utilsMap.findDomById = function (idStr) {
            var dom_txt = id(idStr).find();
            if (dom_txt.empty()) {
                toast('没有找到：' + idStr);
                return null;
            } else {
                toast('找到了：' + idStr);
                return dom_txt;
            }
        };
        //通过文本，查找dom
        utilsMap.findDomByText = function (txt) {
            var dom_txt = text(txt).find();
            if (dom_txt.empty()) {
                toast('没有找到：' + txt);
                return null;
            } else {
                toast('找到了：' + txt);
                return dom_txt;
            }
        };
        //通过描述desc，查找dom
        utilsMap.findDomByDesc = function (txt) {
            var dom_txt = desc(txt).find();
            if (dom_txt.empty()) {
                toast('没有找到：' + txt);
                return null;
            } else {
                toast('找到了：' + txt);
                return dom_txt;
            }
        };
        //在某个范围内通过text寻找控件
        utilsMap.findDomInsideByText = function (txt, x, y, x1, y1) {
            var dom_txt = text(txt).boundsInside(x, y, x1, y1).find();
            if (dom_txt.empty()) {
                toast('没有找到：' + txt);
                return null;
            } else {
                toast('找到了：' + txt);
                return dom_txt;
            }
        };
        //通过id，点击控件
        utilsMap.clickById = function (eleId) {
            var isflag = false; //是否存在
            var dom = id(eleId).find();
            if (dom) {
                console.log(dom);
                isflag = true;
                dom.click();
                sleep(1000);
            }
            console.log(isflag);
            return isflag;
        };
        //通过text，点击控件
        utilsMap.clickByText = function (txt) {
            var isflag = false; //是否存在
            var dom = text(txt).find();
            if (!dom.empty()) {
                console.log(dom);
                isflag = true;
                dom.click();
            }
            console.log(isflag);
            sleep(1000);
            return isflag;
        };
        //点击包含指定文本的控件
        utilsMap.clickByContainsText = function (txt) {
            var isflag = false; //是否存在
            var dom = textContains(txt).find();
            if (!dom.empty()) {
                console.log(dom);
                isflag = true;
                dom.click();
            }
            console.log(isflag);
            sleep(1000);
            return isflag;
        };
        //通过desc，点击控件
        utilsMap.clickByDesc = function (txt) {
            var isflag = false; //是否存在
            var dom = desc(txt).find();
            if (!dom.empty()) {
                console.log(dom);
                isflag = true;
                dom.click();
            }
            sleep(1000);
            return isflag;
        };

        //双击点赞
        utilsMap.doubleClick = function (x, y) {
            click(x, y);
            sleep(100)
            click(x, y);
        };

        //通过UI文本的坐标点击，并返回是否成功
        utilsMap.textBoundsClick = function (textContent) {
            var thisEle = text(textContent).find();
            var flag = false;
            if (!thisEle.empty) {
                utilsMap.boundsClick(thisEle);
                flag = true;
            }
            sleep(1000);
            return flag;
        };

        //通过控件坐标点击
        utilsMap.boundsClick = function (item) {
            var bounds = item.bounds();
            var flag = false;
            if (bounds) {
                click(bounds.centerX(), bounds.centerY());
                flag = true;
            }
            sleep(1000);
            return flag;
        };
        /**
         * 滑动事件
         */
        utilsMap.swipe = function (x, y, x1, y1, time) {
            if (isRoot) {
                utilsMap.rootSwipe(x, y, x1, y1, time);
            } else {
                utilsMap.swipe(x, y, x1, y1, time);
            }
        };

        //滑动阅读新闻
        utilsMap.swapeToRead = function () {
            if (isRoot) {
                utilsMap.rootSwapeToRead();
            } else {
                var swapetime = random(2000, 6000);
                swipe(device.width / 2, device.height * 0.8,
                    device.width / 2, device.height * 0.5, swapetime);
                toast('中场休息');
                var sleeptime = random(1000, 3000);
                sleep(sleeptime);
            }

        };

        //点击底部Tab页切换:0,1,2,3,4
        //totalCount：底部Tab的个数。index:需要点击的tab下标
        utilsMap.clickBottomTab = function (totalCount, index) {
            toast('点击底部tab ' + index);
            var itemWidth = utilsMap.width / totalCount; //一个tab的宽度
            click(itemWidth * index + itemWidth / 2, utilsMap.height - 20);
            sleep(3000);
        };
        /**
         * root账户滑动
         */
        utilsMap.rootSwipe = function (x, y, x1, y1, time) {
            var ra = new RootAutomator();
            ra.swipe(x, y, x1, y1, time);
            ra.exit();
        };
        /**
         * root账户点击
         */
        utilsMap.rootClick = function (x, y) {
            var ra = new RootAutomator();
            ra.press(x, y, 1);
            ra.exit();
        };


        //滑动阅读新闻
        utilsMap.rootSwapeToRead = function () {
            var ra = new RootAutomator();
            //滑动阅读新闻
            ra.swipe(device.width / 2, device.height * 0.8,
                device.width / 2, device.height * 0.5, 5000);

            ra.swipe(device.width / 2, device.height * 0.8,
                device.width / 2, device.height * 0.5, 5000);
            ra.exit();
        };
        /**
         * 返回界面
         */
        utilsMap.back = function () {
            back();
            sleep(1000);
        };
        return utilsMap;

    },

    registerStopEvent: function () {
        events.observeKey();
        events.on("key_down", function (keyCode, event) {
            toast("菜单键按下" + keyCode);
            //处理按键按下事件
            if (keyCode == keys.back || keyCode == keys.menu || keyCode == keys.home) {
                toast("菜单键按下");
                exit();
            }
        });
        events.onKeyDown("volume_up", function (event) {
            toast("音量上键被按下了");
            exit();
        });
        //监听菜单键按下
        events.onKeyDown("menu", function (event) {
            toast("菜单键被按下了");
            exit();
        });

        //启用触摸监听
        events.observeTouch();
        //注册触摸监听器
        events.onTouch(function (p) {
            toast("停止事件");
            exit();
        });
    }


};


module.exports = util;