const autoUtils = require('./utils');
const utils= autoUtils.init();
//create by wangguagnbin

var zhognqing = {
    appName:'薪头条',
    appPackageName:'com.toutiao.news',
    init:function(){
        toast(this.appName);
        var isHasApp = utils.startAPP(this.appName);
        if(!isHasApp) return;
       
        this.taskCenterPage();//1. 开局，任务中心撸一波
        sleep(2000);
        this.firstPageRead();//2. 首页新闻阅读
    },

    //1. 个人中心来一波
    taskCenterPage:function(){
        utils.clickBottomTab(5,3); //点击底部任务页
        //自动签到,取消签到框
        back();
        sleep(3000);
    },

    //2. 阅读首页头条新闻
    firstPageRead:function(){
        utils.clickBottomTab(5,0); //点击底部tab
        utils.clickById('id_fragment_information_datecoins_layout');//点击右上角领取金币
        sleep(1000);
        back();
        sleep(500);
        

        // for(var count=0;count<6;count++){//阅读20条新闻
        while(true){

            var randomvalue = random(100,200);//4的倍数时检查右上角是否可领取金币
            toast('随机数 = '+randomvalue);
            if(randomvalue / 5 == 0){
                utils.clickById('id_fragment_information_datecoins_layout');//点击右上角领取金币
                sleep(1000);
                back();
                sleep(500);
            }

            this.readNewsDetail();
            sleep(500);
            //滑动新闻列表
            swipe(device.width / 2, device.height * 0.8 ,
                device.width / 2, device.height * 0.5, 2000);
            sleep(500)
        }
    },
    //阅读新闻详情页
    readNewsDetail:function(){
        var newsItem = this.findNewsItem(); //找到非广告新闻
        if(newsItem){//可读新闻
            sleep(500);
            var result = utils.boundsClick(newsItem);
            if(!result){
                return;
            }
            sleep(2000);
            var mr = utils.clickByContainsText('展开全文');
            toast('展开全文 = '+mr);
            var repeatCount = random(3,4);
            for(var i=0;i<repeatCount;i++){
                utils.swapeToRead();
            }
            back();
        }
    },

    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = id("id_item_news_ad_mark").findOnce(1);
        console.log(newsItem);
        return newsItem;
    },
}

zhognqing.init();