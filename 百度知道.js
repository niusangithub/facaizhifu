const utils = require('utils.js');



// var Common = {
//     width: device.width, //设备的宽
//     height: device.height, //设备的高
//     startAPP: function (appName) {
//         var isHasApp = launchApp(appName);
//         if (!isHasApp) {
//             toast('手机未安装：' + appName);
//         } else {
//             sleep(5000); //停顿5s
//             var dom_allow = text('允许').find();
//             if (!dom_allow.empty()) {
//                 toast('找到了');
//                 dom_allow.click();
//             } else {
//                 toast('没找到');
//             }
//         }
//         return isHasApp;
//     },
//     closeApp: function () {
//         for (var i = 0; i < 4; i++) {
//             back();
//             sleep(200);
//         }
//         sleep(1000);
//         click(120, 1300);
//     },
//     findDomById: function (idStr) {
//         var dom_txt = id(idStr).find();
//         if (dom_txt.empty()) {
//             toast('没有找到：' + idStr);
//             return null;
//         } else {
//             toast('找到了：' + idStr);
//             return dom_txt;
//         }
//     },

//     click: function (id) {
//         var clickDom = Common.findDomById(id);
//         if (clickDom) {
//             clickDom.click();
//             sleep(500);
//         }
//     },
//     tap: function (x, y) {
//         var ra = new RootAutomator();
//         //让"手指1"点击位置(100, 100)
//         toast("点击");
//         ra.press(x, y, 1);
//         ra.exit();
//     },
//     findDomByText: function (txt) {
//         var dom_txt = text(txt).find();
//         if (dom_txt.empty()) {
//             toast('没有找到：' + txt);
//             return null;
//         } else {
//             toast('找到了：' + txt);
//             return dom_txt;
//         }
//     },
//     findDomInsideByText: function (txt, x, y, x1, y1) {
//         var dom_txt = text(txt).boundsInside(x, y, x1, y1).find();
//         if (dom_txt.empty()) {
//             toast('没有找到：' + txt);
//             return null;
//         } else {
//             toast('找到了：' + txt);
//             return dom_txt;
//         }
//     },
//     swipe: function () {
//         var ra = new RootAutomator();
//         ra.swipe(Common.width / 2, Common.height * 0.8, Common.width / 2, Common.height / 8 * 0.4, 1000);
//         ra.exit();
//     }
// };

//百度知道
var baiduzhidao = {
    isStop: true,
    textIdList: ["tv_title", "daily_recom_title_tv"],
    init: function () {
        this.lastTitleList = {}; //阅读过的视频列表
        this.swipeCount = 0;
        this.totalNewsReaded = 0; //已经阅读的新闻条数 
        this.totalNewsOneTime = 50; //一次性阅读多少条新闻 
        this.loopTimeToFindNews = 20; //找了多少次新闻找不到会退出 
        this.videoList = [];
        this.isfirst = true;
        sleep(5000); //等待15s
        this.todoTask();
    },

    //签到、开宝箱
    todoTask: function () {

        sleep(1000);
        utils.clickById("close_iv");
        // Common.click("open_red_package_iv");
        // //关闭弹窗
        utils.clickById("close_button");
        //切换到任务页
        utils.clickById("answer_tab");
        sleep(1500);
        //切换到首页
        utils.clickById("home_tab");
        //切换到视频tab
        var videoTab = id("activity_home_container_tb_rl").findOne().child(0).child(0);
        videoTab.child(2).click();
        sleep(2000);
        this.exec();

    },

    exec: function () {
        var sleepCount = random(3000, 10000);
        sleep(sleepCount);


        var flag = false;
        this.swipeCount++;
        console.log("当前剩余个数=", this.videoList.length);
        if (this.videoList.length <= 0) {
            if (!this.isfirst) {
                console.log("滑动=", 1);
                utils.swipe(utils.width / 2, utils.height * 0.8, utils.width / 2, utils.height / 8 * 0.4, 1000);
            }
            flag = this.getVideoDom();
            this.isfirst = false;
        } else {
            flag = true;
        }

        if (flag) {
            var curChild = this.videoList.shift();
            if (curChild && curChild.child) {
                curChild.child.click();
                var timeout = setTimeout(function () {
                    //这里的语句会在15秒后执行而不是5秒后
                    utils.clickById("rl_back");
                    clearTimeout(timeout);
                    this.exec();
                }.bind(this), curChild.timeNumber + sleepCount);
            }
        } else {
            sleep(8000);
            this.exec();
        }
    },

    getVideoDom: function () {
        var videoList = id("recycler_view").find();
        var ll_wholeList = id("ll_whole").find();
        console.log("videoList==", videoList.length);
        console.log("ll_wholeList==", ll_wholeList.length);
        if (videoList && !videoList.empty()) {

            if (videoList.length == 2) {
                var tv = videoList[1];
                console.log("tvcount==", tv.childCount())
                for (var i = 0; i < tv.childCount(); i++) {
                    var child = tv.child(i);
                    this.pushVideo(1, child);
                }
            }


        }
        if (ll_wholeList && !ll_wholeList.empty()) {
            if (ll_wholeList.length == 1) {
                this.pushVideo(0, ll_wholeList);
            } else {
                for (var i = 0; i < ll_wholeList.length; i++) {
                    var child = ll_wholeList[i];
                    this.pushVideo(0, child);
                }
            }

        }
        console.log("videoList==", this.videoList);
        if (this.videoList.length > 0) {
            return true;
        } else {
            return false;
        }

    },

    pushVideo: function (type, childVideo) {
        let timeNumber = 20000;
        let time = childVideo.findOne(id("duration_tv"));
        let title = childVideo.findOne(id(this.textIdList[type]));
        if (time && time.text()) {
            var timeArr = time.text().split(":");
            timeNumber = (Number(timeArr[0]) * 60 + Number(timeArr[1])) * 1000;
        }
        console.log("遍历结果==", title.text());
        if (!this.lastTitleList[title.text()]) {
            this.lastTitleList[title.text()] = true;
            this.videoList.push({
                child: childVideo,
                timeNumber: timeNumber,
                title: title.text()
            });
        }
    },


};

var init = function () {
    toast('百度知道');
    var isHasApp = utils.startAPP('百度知道');
    if (!isHasApp) return;
    sleep(5000); //等待15s
    threads.start(function () {
        baiduzhidao.init();
    });
}
init();