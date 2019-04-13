const autoUtils = require('./utils');
const utils= autoUtils.init();
//create by wangguagnbin

var zhognqing = {
    appName:'中青看点',
    appPackageName:'cn.youth.news',
    init:function(){
        toast(this.appName);
        var isHasApp = utils.startAPP(this.appName);
        if(!isHasApp) return;
        utils.clickById('button2');//关闭评论APP弹窗
        sleep(1000);
        utils.clickById('iv_close');//关闭广告弹窗
        sleep(1000);
        this.taskCenterPage();//1. 开局，任务中心撸一波
        sleep(2000);
        this.firstPageRead();//2. 首页新闻阅读
    },

    //1. 个人中心来一波
    taskCenterPage:function(){
        utils.clickBottomTab(4,3); //点击底部tab
        var signResult = utils.clickById('tv_sign');//签到按钮
        if(signResult){
            sleep(1000);
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
    //2. 阅读首页头条新闻
    firstPageRead:function(){
        utils.clickBottomTab(4,0); //点击底部tab
        utils.clickById('button2');//关闭评论APP弹窗
        sleep(1000);
        utils.clickById('iv_close');//关闭广告弹窗
        sleep(1000);

        // for(var count=0;count<6;count++){//阅读20条新闻
        while(true){
            this.readNewsDetail();
            sleep(500);
            //滑动新闻列表
            swipe(device.width / 2, device.height * 0.8 ,
                device.width / 2, device.height * 0.5, 2000);
            sleep(500);
        }
    },
    //阅读新闻详情页
    readNewsDetail:function(){
        var newsItem = this.findNewsItem(); //找到非广告新闻
        if(newsItem){//可读新闻
            sleep(500);
            var result = utils.boundsClick(newsItem.parent());
            toast('找到可读新闻 = '+result);
            if(!result){
                return;
            }
            sleep(2000);
            var mr = utils.clickByContainsText('查看全文，奖励更多');
            toast('展开全文 = '+mr);
            var repeatCount = random(3,6);
            for(var i=0;i<repeatCount;i++){
                utils.swapeToRead();
            }
            var dialogDom = utils.findDomByText('要闻推荐')
            if(dialogDom){
                utils.clickById('iv_close');
            }
            back();
        }
    },

    //关闭弹窗
    closeDialog(){
        sleep(500);
        utils.clickById('iv_close');//关闭广告弹窗
        sleep(500);
        utils.clickByText('稍后回来');
        sleep(500);
        utils.clickById('tv_exit');
        sleep(500);
    },

    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = id("tv_account_name").findOnce(1);
        console.log(newsItem);
        return newsItem;
    },
}

zhognqing.init();