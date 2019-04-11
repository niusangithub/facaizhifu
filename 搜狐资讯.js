"auto";
//残留bug： 弹窗2有问题；
//晒完收入，需要领取一下；
//弧币兑换

const utils = require('./utils');
const autoUtils = utils.init(false);

var souhu ={
    packageName:'搜狐资讯',
    init:function(){
        toast('启动搜狐资讯app');
        var isHasApp = autoUtils.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(15000);//等待15s
        this.todotask();    
        this.lookArticle();
    },
    //todotask
    todotask:function(){
        toast('打开：任务页面');
        var dom_task = text('任务').findOnce().bounds();
        click(dom_task.centerX(),dom_task.centerY());
        sleep(3000);
        //弹窗1
        var dom_sign = autoUtils.findDomById('iv_sign');
        if(dom_sign){
            dom_sign = id('iv_sign').findOnce().bounds();
            click(dom_sign.centerX(),dom_sign.centerY());
            sleep(1000);
            autoUtils.findDomById('redbag_btn_close').click();      
        }
        sleep(2000);
        //弹窗2 : 还有bug        
        var dom_act_close_image = autoUtils.findDomById('act_close_image');
        if(dom_act_close_image){
          dom_act_close_image.click();
        }
        sleep(2000);
        
        //签到
        var dom_lottie_sign_btn = autoUtils.findDomById('lottie_sign_btn');
        if(dom_lottie_sign_btn){
            dom_lottie_sign_btn.click();
            sleep(2000);
            id("redbag_btn_close").findOnce().click();
        }
        sleep(2000);
        //分享：晒收入
        for(var i=0;i<4;i++){
           swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, 120, 600);    
           sleep(500);
        }
        var dom_shareMoney = autoUtils.findDomByText('晒一晒');
        if(dom_shareMoney){
            autoUtils.boundsClick(text('晒一晒').findOnce());
            sleep(2000);
            id('wechat').findOnce().click();
            sleep(3000);
            back();
        }

    },
    lookOneArticle:function(){
        //检测是否有能量红包
        var dom_redpacket = autoUtils.findDomById('energy_open');
        if(dom_redpacket){
            dom_redpacket.click();
            sleep(1000);
            autoUtils.findDomById('btn_receive').click();
        }
        sleep(1500);
        var dom_adv = autoUtils.findDomInsideByText('广告',0,106,1080,1208);    
        if(!dom_adv){
            //不是广告位
            click(autoUtils.width/2,370);
            sleep(1200);//等待文章加载
            for(var i=0;i<14;i++){                
                var scrollHeight = random(800,1000);//滑动的距离
                if(i>6){
                    scrollHeight = random(50,100);  
                }
                var sleepTime = random(1200,2000);//睡眠时长
                swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, scrollHeight, 600);    
                sleep(sleepTime);
            }          
            back();
        }
        sleep(1000);

    },
    //看文章
    lookArticle:function(){
        var dom_task = text('首页').findOnce().bounds();
        click(dom_task.centerX(),dom_task.centerY());    
        sleep(1000);
        while(true){
            this.lookOneArticle();
            swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, 800, 600);    
        }
    }
};

souhu.init();