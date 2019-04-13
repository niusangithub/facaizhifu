"auto";
const utils = require('./utils');
const autoUtils = utils.init(false);
//1、分享收入
//2、阅读过程中，遇到 时段奖励bug
//3、阅读完毕后，领取金币


var wangyi = {
    packageName:'网易新闻极速版',
    shareCount:0,
    minutesMoney:40,//看40分钟有奖励
    init:function(){      
        toast('启动网易新闻app');
        var isHasApp = autoUtils.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(15000);//等待15s
        this.closeBox();
       this.todoTask();
        this.lookArticle();
    },
    //关闭弹窗
    closeBox:function(){
        var dom_close = autoUtils.findDomById('u4');
        if(dom_close){
            dom_close.click();
        }
        sleep(1000);
    },
    todoTask:function(){
        var dom_task = text('任务').findOnce().bounds();
        click(dom_task.centerX(),dom_task.centerY());
        sleep(3000);
        //签到
        var dom_sign = autoUtils.findDomByText('签到领金币');
        if(dom_sign){
            dom_sign.click();
            sleep(1000);
            click(530,1700);
        }
        sleep(1000);
        //分享收入

        //40分钟后，领取宝箱
    },
    //分享文章
    shareArticle:function(){
        for(var i=0;i<2;i++){
            this.shareCount++;
            var dom_ais = autoUtils.findDomById('ais');
            if(dom_ais){
                dom_ais.click();
                sleep(1800);
                var dom_wx = autoUtils.findDomByText('微信');
                if(dom_wx){
                    var bounds_wx = text('微信').findOnce().bounds();
                    click(bounds_wx.centerX(),bounds_wx.centerY()-30);
                    sleep(3000);
                    back();
                }
            }
            sleep(2000);
        }
    },
    lookOneArticle:function(){
        //检测右上角是否可以开宝箱，bug
        // if(autoUtils.findDomByText('领取40金币')){
        //     var dom_1 = id('ax8').findOnce();
        //     dom_1.click();
        //     sleep(1000);
        //     click(520,1650);
        //     sleep(500);
        // }
        //其他弹窗
        var dom_box1 = autoUtils.findDomById('an2');
        if(dom_box1){
            var dom_box1_close = autoUtils.findDomById('os');
            if(dom_box1_close){
                dom_box1_close.click();
            }
        }
        sleep(1000);
        var dom_adv = autoUtils.findDomInsideByText('广告',0,106,1080,1208);    
        if(!dom_adv){
            //不是广告位
            click(autoUtils.width/2,370);
            sleep(2000);//等待文章加载
            for(var i=0;i<14;i++){   
                //如果是视频，需要点击重新播放
                var dom_reload = autoUtils.findDomByText('重播');
                if(dom_reload){
                    dom_reload.click();
                    sleep(1000);
                    i++;
                }
                //继续阅读文章
                var scrollHeight = random(800,1000);//滑动的距离               
                var sleepTime = random(1200,2000);//睡眠时长
                var dom_lookall = autoUtils.findDomByText('查看全文');
                if(dom_lookall){
                    dom_lookall.click();
                    sleep(400);
                }
                swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, scrollHeight, 600);    
                sleep(sleepTime);
            }          
            back();
        }
        sleep(1000);
    },
    lookArticle:function(){
        //首页： 右上角宝箱
        var dom_task = text('首页').findOnce().bounds();
        click(dom_task.centerX(),dom_task.centerY());    
        sleep(1000);       
        while(true){
            this.lookOneArticle();
            swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, 800, 600);    
        }
    },
};
wangyi.init();
