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
        this.lookArticle();
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
        toast('打开：任务页面');
        var dom_task = text('任务').findOnce().bounds();
        click(dom_task.centerX(),dom_task.centerY());
        sleep(3000);
        //关闭签到弹窗
        // var dom_huanyipi = autoUtils.findDomByText('换一批');
        // if(dom_huanyipi){
        //     click(880,689);
        // }
        // sleep(1000);
       
    },
    lookOneArticle:function(){
    //    var dom_ob = id('ob').findOnce();
    //     if(dom_ob){
    //         toast(dom_ob.childCount());
    //     }
    //     toast(12);
    //     return;
        var dom_adv = autoUtils.findDomInsideByTextContains('广告',0,106,1080,1208);    
        return;
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
    //获取右上角的宝箱
    getBoxMoney:function(){
        var dom_vi = autoUtils.findDomById('vi');
        if(dom_vi){
            dom_vi.click();
            sleep(2000);
            back();
        }
    },

    //看文章
    lookArticle:function(){
        //首页
        // toast('打开：首页');
        // var dom_task = text('头条').findOnce().bounds();
        // click(dom_task.centerX(),dom_task.centerY());
        // sleep(3000);
        //this.getBoxMoney();
        //swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, 120, 600);    
        this.lookOneArticle();
        return;
        while(true){
            this.lookOneArticle();
            swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, 1000, 600);    
        }
    }
};

qutoutiao.init();