const utils = require('./utils');
const autoUtils = utils.init();

//百度知道
var yuetoutiao = {

    textIdList: ["txt_advName", "txt_second_advName"],
    //txt_titleName
    titleTextIdList: ["txt_titleName", "txt_second_titleName"],
    init: function () {
        this.lastTitleList = {}; //阅读过的视频列表
        this.swipeCount = 0;
        // this.totalNewsReaded = 0; //已经阅读的新闻条数 
        // this.totalNewsOneTime = 50; //一次性阅读多少条新闻 
        // this.loopTimeToFindNews = 20; //找了多少次新闻找不到会退出 
        this.newsList = [];
        this.isfirst = true;
        // sleep(5000); //等待15s
        toast("调用");
        this.todoTask();
    },

    //签到、开宝箱
    todoTask: function () {
        //layout_invite   layout_video  layout_news llSiginin(签到)  ivClose(关闭弹出窗)
        //layout_item_second_news(新闻item)   iv_bouy 
        //切换到任务tab
        autoUtils.clickById("layout_invite");
        sleep(5000); //等待15s
        //点击签到
        autoUtils.clickById("llSiginin");
        //关闭弹窗
        autoUtils.clickById("ivClose");
        //切换到头条
        autoUtils.clickById("layout_news");
        this.exec();

    },


    exec: function () {
        var isClose = this.checkHome();
        if (!isClose) {
            var sleepCount = random(3000, 10000);
            sleep(sleepCount);
            var flag = false;
            this.swipeCount++;
            console.log("当前剩余个数=", this.newsList.length);
            if (this.newsList.length <= 0) {
                if (!this.isfirst) {
                    autoUtils.swipe(autoUtils.width / 2, autoUtils.height * 0.8, autoUtils.width / 2, autoUtils.height / 8 * 0.4, 1000);
                }
                flag = this.getNewsDom();
                this.isfirst = false;
            } else {
                flag = true;
            }

            if (flag) {
                var curChild = this.newsList.shift();
                console.log("点击==", curChild.title);
                if (curChild && curChild.child) {
                    curChild.child.click();
                    //读取一条新闻
                    sleep(10000);
                    if (this.checkNewsDetail()) {
                        this.readNews(50);
                    }
                    console.log("走下一个");
                    this.exec();
                }
            } else {
                sleep(8000);
                this.exec();
            }
        }

    },
    checkNewsDetail: function () {
        // var baiduBtn = desc("百度一下").findOne();
        // if (baiduBtn) {
        //     back();
        //     return false;
        // }
        return utils.findDomById("rv_read_progress");
    },
    checkHome: function () {
        var flag = false;
        for (let i = 0; i < 5; i++) {
            var ivClose = utils.findDomById("iv_close");
            if (!ivClose) {
                flag = false;
                break;
            } else {
                flag = true;
                utils.click("iv_close");
                sleep(3000);
            }
        }

        // var baiduBtn = desc("百度一下").findOne();
        // if (baiduBtn) {
        //     back();
        // }
        return flag;
    },
    /**
     * 获取页面新闻
     */
    getNewsDom: function () {
        var newsSecondList = id("layout_item_second_news").find();
        var newsList = id("layout_item_news").find();
        //txt_advName  txt_second_advNa
        // var ll_wholeList = id("ll_whole").find();
        // console.log("videoList==", videoList.length);
        // console.log("ll_wholeList==", ll_wholeList.length);
        // if (videoList && !videoList.empty()) {

        if (newsSecondList && newsSecondList.length > 0) {
            for (var i = 0; i < newsSecondList.length; i++) {
                console.log(newsSecondList[i]);
                // var child = newsSecondList.child(i);
                this.pushNews(1, newsSecondList[i]);
            }
        }

        if (newsList && newsList.length > 0) {
            console.log("新闻列表====", newsList.length);
            // for (var i = 0; i < newsList.length; i++) {
            //     let child = newsList.child(i);
            //     this.pushNews(0, child);
            // }
        }


        // }
        // if (ll_wholeList && !ll_wholeList.empty()) {
        //     if (ll_wholeList.length == 1) {
        //         this.pushVideo(0, ll_wholeList);
        //     } else {
        //         for (var i = 0; i < ll_wholeList.length; i++) {
        //             var child = ll_wholeList[i];
        //             this.pushVideo(0, child);
        //         }
        //     }

        // }
        // console.log("videoList==", this.videoList);
        if (this.newsList.length > 0) {
            return true;
        } else {
            return false;
        }

    },

    // //阅读新闻
    readNews: function (seconds) {
        //滑动阅读新闻
        for (var i = 0; i < seconds / 10; i++) {
            utils.swapeToRead();
        }
        console.log("返回");
        utils.back();

    },
    pushNews: function (type, childVideo) {
        let artFlag = childVideo.findOne(id(this.textIdList[type]));
        if (artFlag && artFlag.text() && artFlag.text().indexOf("广告") !== -1) {
            return;
        }
        let title = childVideo.findOne(id(this.titleTextIdList[type]));
        console.log("title.text()===", title.text());
        if (title && !title.text()) {
            return;
        }
        if (!this.lastTitleList[title.text()]) {
            this.lastTitleList[title.text()] = true;
            this.newsList.push({
                child: childVideo,
                title: title.text()
            });
        }
    },


};



var AppName = "悦头条";
var init = function () {
    toast(AppName);
    var isHasApp = autoUtils.startAPP(AppName);
    if (!isHasApp) return;
    sleep(5000); //等待15s
    threads.start(function () {
        yuetoutiao.init();
    });
}
init();