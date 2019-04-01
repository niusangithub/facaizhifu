auto();
const utils = require('Utils.js');


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
        utils.click("layout_invite");
        sleep(5000); //等待15s
        //点击签到
        utils.click("llSiginin");
        //关闭弹窗
        utils.click("ivClose");
        //切换到头条
        utils.click("layout_news");
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
                    utils.swipe();
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


console.show();
var AppName = "悦头条";
var thread = null;
var init = function () {
    utils.wakeUp();
    toast(AppName);
    utils.launch(AppName);
    events.observeKey();
    events.on("key_down", function (keyCode, event) {
        toast("菜单键按下" + keyCode);
        //处理按键按下事件
        if (keyCode == keys.back || keyCode == keys.menu || keyCode == keys.home) {
            toast("菜单键按下");
            exit();
            thread.interrupt();
            threads.shutDownAll();
        }
    });
    events.onKeyDown("volume_up", function (event) {
        toast("音量上键被按下了");
        exit();
        thread.interrupt();
        threads.shutDownAll();
    });
    //监听菜单键按下
    events.onKeyDown("menu", function (event) {
        toast("菜单键被按下了");
        exit();
        thread.interrupt();
        threads.shutDownAll();

    });

    //启用触摸监听
    events.observeTouch();
    //注册触摸监听器
    events.onTouch(function (p) {
        toast("停止事件");
        exit();
        thread.interrupt();
        threads.shutDownAll();
    });
    thread = threads.start(function () {
        console.log("初始化");
        yuetoutiao.init();

    });
}
init();



/**
 * 全局参数
 */
// var lastNewsText = ""; //上一次新闻标题
// var totalNewsReaded = 0; //已经阅读的新闻条数
// var totalNewsOneTime = 50; //一次性阅读多少条新闻
// var loopTimeToFindNews = 20; //找了多少次新闻找不到会退出
// var indexFlagText = "刷新"; //首页特有的标志文字

// /**
//  * 主循环
//  */
// utils.wakeUp();
// utils.launch("悦头条");
// jumpToIndex();
// signIn();
// while (true) {
//     //领取时段奖励
//     getAward();
//     //找到一条新闻
//     getOneNews();
//     //阅读新闻60s
//     readNews(30);
//     //返回新闻列表
//     utils.backToIndex(indexFlagText);
// }

// //跳转到首页
// jumpToIndex: function () {

//     //循环关闭所有的弹出框
//     var flag = text(indexFlagText).findOnce();
//     while (!flag) {

//         //领取奖励
//         utils.UIClick("ll_quit");

//         sleep(1000);
//         flag = text(indexFlagText).findOnce();
//     }
// }


// //领取时段奖励
// function getAward() {}

// // 获取一条新闻
// function getOneNews() {

//     //阅读超过50条，刷新页面
//     if (totalNewsReaded > totalNewsOneTime) {
//         totalNews = 0;
//         click(1, 1919);
//         sleep(2000);
//     }

//     //上滑找新闻
//     var isFindNews = false; //是否找到新闻
//     var newsText = ""; //新闻标题
//     var newsItem; //新闻条目
//     loopTimeToFindNews = 0; //循环次数
//     while ((!isFindNews || lastNewsText === newsText) && loopTimeToFindNews < 20) {
//         //找新闻次数+1
//         loopTimeToFindNews++;

//         //进行下翻
//         swipe(device.width / 2, device.height / 4 * 2, device.width / 2, device.height / 4, 1000);
//         sleep(1000);

//         //新闻条目
//         newsItem = className("android.support.v4.view.ViewPager")
//             .className("android.support.v7.widget.RecyclerView")
//             .className("LinearLayout").findOnce();
//         if (newsItem) {
//             //判断是不是广告,通过是否有阅读数量判断
//             var adFlag = newsItem.child(1);
//             if (adFlag && adFlag.text() == "【广告】") {
//                 newsItem = null;
//             } else {
//                 newsText = newsItem.child(0).text();
//                 isFindNews = true;
//             }
//         }
//     }

//     //找到新闻，点击阅读
//     if (isFindNews) {
//         lastNewsText = newsText;
//         totalNewsReaded++;
//         newsItem.click();
//     } else {
//         toast("20次滑动没有找到新闻，请检查新闻ID");
//         exit();
//     }
// }

// //阅读新闻
// function readNews(seconds) {

//     //滑动阅读新闻
//     for (var i = 0; i < seconds / 10; i++) {
//         utils.swapeToRead();
//     }

// }