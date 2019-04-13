"auto";
const utils = require('./utils');
const autoUtils = utils.init(false);

//刷宝app
var shuabao = {
    packageName:'刷宝',
    init:function(){
        toast('启动刷宝app');
        var isHasApp = autoUtils.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(15000);//等待15s
        this.closeTongZhi();
        this.todoTask();
        this.lookVideo();
    },
    //关闭通知权限
    closeTongZhi:function(){
        var dom_cancle = autoUtils.findDomByText('取消');
        if(dom_cancle){
            dom_cancle.click();
            sleep(1000);
        }
    },
    closeTaskBox:function(){
        var dom_close = autoUtils.findDomById('imgClose');
        if(dom_close){
            dom_close.click();
        }
    },
    //签到、开宝箱
    todoTask:function(){       
        //切换到任务页面
        var dom_task_bounds = text('任务').findOne().bounds();
        click(dom_task_bounds.centerX(),dom_task_bounds.centerY());
        sleep(2500);
        //关闭弹窗
        this.closeTaskBox();
        sleep(3300);
        //签到
        var dom_sign = autoUtils.findDomByText('立即签到');
        if(dom_sign){
            dom_sign.click();
            sleep(500); 
            click(834,432);   
            sleep(500);
        }
    },
    lookVideo:function(){
        //切换到首页
        var dom_task_bounds = text('首页').findOne().bounds();
        click(dom_task_bounds.centerX(),dom_task_bounds.centerY());
        sleep(500);
        while(true){
            var sleepCount = random(6000,20000);
            if(sleepCount<9000){
                sleepCount = 1000;
            }
            sleep(sleepCount);
            click(dom_task_bounds.centerX(),dom_task_bounds.centerY());
           // swipe(autoUtils.width/2,autoUtils.height/8*7,autoUtils.width/2,autoUtils.height/8*1,1000);
        }
    }
};
shuabao.init();