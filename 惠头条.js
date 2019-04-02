"auto";
const utils = require('utils.js');

var huitoutiao = {
    appName:'惠头条',
    appPackageName:'com.cashtoutiao',
    init:function(){
        toast(this.appName);
        var isHasApp = utils.startAPP(this.appName);
        if(!isHasApp) return;
        sleep(2000);
        utils.clickById('img_close');//关闭广告弹窗
        this.readFirstPage();
    },

    //阅读首页头条新闻
    readFirstPage:function(){
        this.clickBottomTab(0); //点击底部tab
        this.clickTimeGift(); //点击时段奖励
        // while(5){
            var newsItem = this.findNewsItem(); //找到非广告新闻
            if(newsItem){//可读新闻
                utils.boundsClick(newsItem);
                sleep(2000);

                utils.clickByDesc('展开全文');

                var repeatCount = random(4,8);
                for(var i=0;i<repeatCount;i++){
                    utils.swapeToRead();
                }
                back();//退出阅读
            }
        // }
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

    //点击底部Tab页切换:0,1,2,3,4
    clickBottomTab:function(index){
        toast('点击底部tab '+index);
        var itemWidth = utils.width / 5;//一个tab的宽度
        click(itemWidth * index + itemWidth/2,utils.height - 20);
        sleep(3000);
    },

    //点击右下角奖励
    clickJiangli:function(){
        var clickResult = utils.clickById('fl_reward')
        if(clickResult){
            sleep(5000)
        }else{
            toast('右下角没有多余奖励')
        }
    },

    //点击时段奖励
    clickTimeGift:function(){
        var clickResult = utils.textBoundsClick('点击领取');
        if(clickResult){
            sleep(5000);
            utils.clickById('tv_left');//弹窗点击忽略
        }else{
            toast('时段奖励时间未到');
        }
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