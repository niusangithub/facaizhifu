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
        back();
        sleep(1000);
        this.taskCenterPage();
        sleep(1000);
        this.firstPageRead();
    },
  
    //1. 个人中心来一波
    taskCenterPage:function(){
        utils.clickBottomTab(5,3); //点击任务tab
        var signResult = utils.clickById('btn_sign');//签到按钮
        sleep(1000);
        back();//关闭弹窗
        sleep(500);
    },
    //2. 阅读首页头条新闻
    firstPageRead:function(){
        utils.clickBottomTab(5,0); //点击底部tab
        while(true){
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
            sleep(500);
            var result = utils.boundsClick(newsItem);
            if(!result){
                return;
            }
            sleep(2000);
            var mr = utils.clickById('ll_expand');
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
        var newsItem = id('tv_time').findOnce(1);
        console.log(newsItem);
        return newsItem;
    },
}
oriage.init();