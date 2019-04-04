"auto";
const utils = require('utils.js');
//create by wangguagnbin
var huitoutiao = {
    appName:'惠头条',
    appPackageName:'com.cashtoutiao',
    init:function(){
        toast(this.appName);
        var isHasApp = utils.startAPP(this.appName);
        if(!isHasApp) return;
        sleep(2000);
        utils.clickById('img_close');//关闭广告弹窗
        this.taskCenterPage();//1. 开局，任务中心撸一波
        while(true){
            this.readFirstPage();//2. 首页是主力，不能放过
            this.taskCenterPage(); //3. 撸了那么久，任务中心领取奖励
            utils.clickBottomTab(5,4); //进入我的页面，汇总收益
            sleep(1000);
        }
    },

    //1. 任务中心来一波
    taskCenterPage:function(){
        utils.clickBottomTab(5,3); //点击底部tab
        sleep(500);
        var clickResult = utils.clickById('sign_step_entrance');//签到
        if(clickResult){
            sleep(1000);
            back();
        }

        for(var count = 0;count <5;count++){//寻找"立即领取"按钮，并点击领取（有可能多个）
            sleep(500);
            var result = utils.clickById('btn_take');
            if(!result){//没有可点击的了
                return;
            }
            sleep(500);
        }
    },

    //2. 阅读首页头条新闻
    readFirstPage:function(){
        utils.clickBottomTab(5,0); //点击底部tab
        sleep(2000);
        this.clickTimeGift(); //点击时段奖励
        for(var count=0;count<20;count++){//阅读20条新闻
            toast('count = '+count);
            this.readNewsDetail();
            sleep(1000);
            //滑动新闻列表
            swipe(device.width / 2, device.height * 0.8 ,
                device.width / 2, device.height * 0.5, 2000);
        }
    },

    //阅读新闻详情页
    readNewsDetail:function(){
        var newsItem = this.findNewsItem(); //找到非广告新闻
        if(newsItem){//可读新闻
            var result = utils.boundsClick(newsItem);
            if(!result){
                return;
            }
            sleep(2000);
            var mr = utils.clickByContainsText('展开全文');
            toast('展开全文 = '+mr);
            var repeatCount = random(4,8);
            for(var i=0;i<repeatCount;i++){
                utils.swapeToRead();
            }
            back();
        }
    },

    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = id("tv_src").findOnce(1);
        if(newsItem){
            toast('text = '+newsItem.text());
            //判断是否是广告
            if(newsItem && newsItem.text() == "广告"){
                newsItem = null;
            }
        }
        return newsItem;
    },

    //点击右下角奖励
    clickJiangli:function(){
        var clickResult = utils.clickById('fl_reward')
        if(clickResult){
            sleep(5000)
            utils.clickById('tv_left');//弹窗点击忽略
        }else{
            toast('右下角没有多余奖励')
        }
    },

    //点击时段奖励
    clickTimeGift:function(){
        click(utils.width - 50,100);
        sleep(2000);
        back();
        sleep(1000);
        return;
    },

    //点击"展开全文"
    clickExpandAll:function(){
        var clickResult = utils.textBoundsClick('展开全文');
        if(clickResult){
            sleep(10000);
        }
    }
}

huitoutiao.init();