const utils = require('./utils');
const autoUtils = utils.init();

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
        autoUtils.clickById("close_iv");
        // Common.click("open_red_package_iv");
        // //关闭弹窗
        autoUtils.clickById("close_button");
        //切换到任务页
        autoUtils.clickById("answer_tab");
        sleep(1500);
        //切换到首页
        autoUtils.clickById("home_tab");
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
                autoUtils.swipe(autoUtils.width / 2, autoUtils.height * 0.8, autoUtils.width / 2, autoUtils.height / 8 * 0.4, 1000);
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
                    autoUtils.clickById("rl_back");
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
    var isHasApp = autoUtils.startAPP('百度知道');
    if (!isHasApp) return;
    sleep(5000); //等待15s
    baiduzhidao.init();
}
init();