"auto";
const utils = require('./utils');
const autoUtils = utils.init(false);

var qutoutiao ={
    packageName:'趣头条',
    init:function(){
        // toast('启动趣头条app');
        // var isHasApp = autoUtils.startAPP(this.packageName);
        // if(!isHasApp)return;     
        // sleep(15000);//等待15s
        // this.close_indexBox();
        // this.todotask();    
        //this.lookArticle();
    },
    //关闭首页弹窗
    close_indexBox:function(){
        var dom_close_img = autoUtils.findDomById('img_close');
        if(dom_close_img){
            dom_close_img.click();
        }
        sleep(1000);
    },
    //todotask
    todotask:function(){
        toast('打开：每日金币');
        var dom_task = text('每日金币').findOnce().bounds();
        click(dom_task.centerX(),dom_task.centerY());
        sleep(3000);
        //关闭签到弹窗
        var dom_huanyipi = autoUtils.findDomByText('换一批');
        if(dom_huanyipi){
            click(880,689);
        }
        sleep(1000);
        back();
    },
    lookOneArticle:function(){
        var dom_adv = autoUtils.findDomInsideByText('广告',0,106,1080,1208);    
        if(!dom_adv){
            //不是广告位
            click(autoUtils.width/2,370);
            sleep(1200);//等待文章加载
            for(var i=0;i<14;i++){                
                var scrollHeight = random(600,1200);//滑动的距离
                var sleepTime = random(1200,2000);//睡眠时长
                var dom_lookall = autoUtils.findDomByText('展开查看全文');
                if(dom_lookall){
                    dom_lookall.click();
                    sleep(500);
                }
                swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, scrollHeight, 600);    
                sleep(sleepTime);
            }          
            back();
        }
        sleep(1000);
    },
    //看文章
    lookArticle:function(){
        while(true){
            this.lookOneArticle();
            swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, 1000, 600);    
        }
    }
};

qukantianxia.init();