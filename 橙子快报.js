const autoUtils = require('./utils');
const utils= autoUtils.init();
//create by wangguagnbin

var oriage = {
    appName:'橙子快报',
    appPackageName:'com.quyu.youliao',
    init:function(){
        toast(this.appName);
        var isHasApp = utils.startAPP(this.appName);
        if(!isHasApp) return;
        this.closeDialog();
        this.dealFirstPageDialog();
        // this.taskCenterPage();
        sleep(1000);
    },

    dealFirstPageDialog(){
        var shareClick = utils.clickById('btn_share');
        sleep(500);

    },

    //1. 个人中心来一波
    taskCenterPage:function(){
        utils.clickBottomTab(5,3); //点击任务tab
        var signResult = utils.clickById('btn_sign');//签到按钮
        if(signResult){
            sleep(1000);

            return;
            //签到领青豆
            var clickSignNow = utils.clickByText('立即签到');
            if(clickSignNow){//取消弹窗
                sleep(500);
                back();
                sleep(500);
            }

            this.closeDialog();
            //定时红包领青豆
            var timeRed = utils.clickByText('定时红包');
            if(timeRed){
                var clickGet = utils.clickByText('点击领取');
                if(clickGet){
                    sleep(500);
                    var shareWechat = utils.clickByContainsText('分享到微信群，再得');
                    if(shareWechat){//分享成功返回领取
                        sleep(1000);
                        back();
                    }
                    utils.clickById('iv_close');//关闭广告弹窗
                     //邀请好友页面需要返回两次才能回到任务中心页面
                     sleep(500);
                     back();
                     sleep(500);
                     back();
                }
            }
            this.closeDialog();
            //任务中心返回"我的"
            sleep(500);
            back();
            sleep(500);
            back();
            sleep(500);
            back();
        }
    },
    // //2. 阅读首页头条新闻
    // firstPageRead:function(){
    //     utils.clickBottomTab(4,0); //点击底部tab
    //     utils.clickById('button2');//关闭评论APP弹窗
    //     sleep(1000);
    //     utils.clickById('iv_close');//关闭广告弹窗
    //     sleep(1000);

    //     // for(var count=0;count<6;count++){//阅读20条新闻
    //     while(true){
    //         this.readNewsDetail();
    //         sleep(1000);
    //         //滑动新闻列表
    //         swipe(device.width / 2, device.height * 0.8 ,
    //             device.width / 2, device.height * 0.5, 2000);
    //     }
    // },
    // //阅读新闻详情页
    // readNewsDetail:function(){
    //     var newsItem = this.findNewsItem(); //找到非广告新闻
    //     if(newsItem){//可读新闻
    //         sleep(500);
    //         var result = utils.boundsClick(newsItem);
    //         if(!result){
    //             return;
    //         }
    //         sleep(2000);
    //         var mr = utils.clickByContainsText('查看全文，奖励更多');
    //         toast('展开全文 = '+mr);
    //         var repeatCount = random(3,6);
    //         for(var i=0;i<repeatCount;i++){
    //             utils.swapeToRead();
    //         }
    //         back();
    //     }
    // },

    // //找出新闻的条目
    // findNewsItem:function(){
    //     var newsItem = id("tv_account_name").findOnce(1);
    //     console.log(newsItem);
    //     return newsItem;
    // },
}
oriage.init();