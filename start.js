"auto";
var Common = {
    width: device.width, //设备的宽
    height: device.height, //设备的高
    //通过名字||包名，启动app
    startAPP: function (name) {
        var isHasApp = launchApp(name);
        if (!isHasApp) {
            toast('手机未安装：' + name);
        } else {
            //设置屏幕缩放
            setScreenMetrics(1080, 1920);
            sleep(5000); //停顿5s
            var dom_allow = this.findDomByText('允许');
            if (dom_allow) {               
                dom_allow.click();
            } 
        }
        return isHasApp;
    },
    //通过包名，关闭app
    closeApp:function(packageName){
        try{
            packageName =packageName || currentPackage();
            var result = app.openAppSetting(packageName);
            if(result){
                sleep(2000);
                this.findDomByText('结束运行').click();
                sleep(1000);
                this.findDomByText('确定').click();
                home();
                sleep(200);
                home();
            }
        }catch(ex){
            home();
            sleep(200);
            home();
        }
    },
    //通过id，查找dom
    findDomById: function (idStr) {
        var dom_txt = id(idStr).find();
        if (dom_txt.empty()) {
            toast('没有找到：' + idStr);
            return null;
        } else {
            toast('找到了：' + idStr);
            return dom_txt;
        }
    },
    //通过文本，查找dom
    findDomByText: function (txt) {
        var dom_txt = text(txt).find();
        if (dom_txt.empty()) {
            toast('没有找到：' + txt);
            return null;
        } else {
            toast('找到了：' + txt);
            return dom_txt;
        }
    },
    //通过描述desc，查找dom
    findDomByDesc:function(txt){
        var dom_txt = desc(txt).find();
        if (dom_txt.empty()) {
            toast('没有找到：' + txt);
            return null;
        } else {
            toast('找到了：' + txt);
            return dom_txt;
        }
    },
    //在某个范围内通过text寻找控件
    findDomInsideByText:function(txt,x,y,x1,y1){
        var dom_txt = text(txt).boundsInside(x,y,x1,y1).find();
        if (dom_txt.empty()) {
            toast('没有找到：' + txt);
            return null;
        } else {
            toast('找到了：' + txt);
            return dom_txt;
        }
    },
    //通过id，点击控件
    clickById:function(idStr){
        var isflag = false; //是否存在
        var dom = id(idStr).findOnce();
        if(dom){
            isflag = true;
            dom.click();
        }
        sleep(1000);
        return isflag;
    },
    //通过text，点击控件
    clickByText:function(txt){
        var isflag = false; //是否存在
        var dom = text(txt).findOnce();
        if(dom){
            isflag = true;
            dom.click();
        }
        sleep(1000);
        return isflag;
    },
     //通过desc，点击控件
    clickByDesc:function(txt){
        var isflag = false; //是否存在
        var dom = desc(txt).findOnce();
        if(dom){
            isflag = true;
            dom.click();
        }
        sleep(1000);
        return isflag;
    },
    //以下方法，root权限才可用
    tap: function (x, y) {
        var ra = new RootAutomator();
        //让"手指1"点击位置(100, 100)
        toast("点击");
        ra.press(x, y, 1);
        ra.exit();
    },
    swipe: function () {
        var ra = new RootAutomator();
        ra.swipe(Common.width / 2, Common.height * 0.8, Common.width / 2, Common.height / 8 * 0.4, 1000);
        ra.exit();
    }
    
};
var MyThread = {
    childThread :null,
    startOne:function(callback){
        this.childThread = threads.start(function(){
            //在子线程执行的定时器
            // setTimeout(function(){
                toast('子线程中启动：'+threads.currentThread());
                callback();
            // }, 1000);
        });
        this.childThread.waitFor();
    },
    disposeThread:function(){
        if(this.childThread){
            this.childThread.interrupt();
        }
    }

};

//刷宝app
var shuabao = {
    packageName:'刷宝',
    init:function(){
        toast('启动刷宝app');
        var isHasApp = Common.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(15000);//等待15s
        this.closeTongZhi();
        this.todoTask();
        this.lookVideo();
    },
    //关闭通知权限
    closeTongZhi:function(){
        var dom_cancle = Common.findDomByText('取消');
        if(dom_cancle){
            dom_cancle.click();
            sleep(1000);
        }
    },
    closeTaskBox:function(){
        var dom_close = Common.findDomById('imgClose');
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
        var dom_sign = Common.findDomByText('立即签到');
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
           // swipe(Common.width/2,Common.height/8*7,Common.width/2,Common.height/8*1,1000);
        }
    }
};
//搜狐资讯app
var souhu ={
    packageName:'搜狐资讯',
    init:function(){
        toast('启动搜狐资讯app');
        var isHasApp = Common.startAPP(this.packageName);
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
        //1、签到
        sleep(1000);
        //弹窗1
        var dom_sign = Common.findDomById('iv_sign');
        if(dom_sign){
            dom_sign = id('iv_sign').findOnce().bounds();
            click(dom_sign.centerX(),dom_sign.centerY());
            sleep(1000);
            Common.findDomById('redbag_btn_close').click();      
        }
        sleep(1000);
        //弹窗2
        var dom_act_close_image = Common.findDomById('act_close_image');
        if(dom_act_close_image){
          dom_act_close_image.click();
        }
        sleep(2000);
    },
    lookOneArticle:function(){
        //检测是否有能量红包
        var dom_redpacket = Common.findDomById('energy_open');
        if(dom_redpacket){
            dom_redpacket.click();
            sleep(1000);
            Common.findDomById('btn_receive').click();
        }
        sleep(1500);
        var dom_adv = Common.findDomInsideByText('广告',0,106,1080,1208);    
        if(!dom_adv){
            //不是广告位
            click(Common.width/2,370);
            sleep(1200);//等待文章加载
            for(var i=0;i<14;i++){                
                var scrollHeight = random(800,1000);//滑动的距离
                if(i>6){
                    scrollHeight = random(50,100);  
                }
                var sleepTime = random(1200,2000);//睡眠时长
                swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, scrollHeight, 600);    
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
            swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, 800, 600);    
        }
    }
};
//趣看天下
var qukantianxia ={
    packageName:'趣看天下',
    init:function(){
        toast('启动趣看天下app');
        var isHasApp = Common.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(15000);//等待15s
        this.close_indexBox();
        this.todotask();    
        this.lookArticle();
    },
    //关闭首页弹窗
    close_indexBox:function(){
        var dom_close_img = Common.findDomById('img_close');
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
        var dom_huanyipi = Common.findDomByText('换一批');
        if(dom_huanyipi){
            click(880,689);
        }
        sleep(1000);
        back();
    },
    lookOneArticle:function(){
        var dom_adv = Common.findDomInsideByText('广告',0,106,1080,1208);    
        if(!dom_adv){
            //不是广告位
            click(Common.width/2,370);
            sleep(1200);//等待文章加载
            for(var i=0;i<14;i++){                
                var scrollHeight = random(600,1200);//滑动的距离
                var sleepTime = random(1200,2000);//睡眠时长
                var dom_lookall = Common.findDomByText('展开查看全文');
                if(dom_lookall){
                    dom_lookall.click();
                    sleep(500);
                }
                swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, scrollHeight, 600);    
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
            swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, 1000, 600);    
        }
    }
};
//红包视频
var hongbao = {
    packageName:'红包视频',
    init:function(){
        toast('启动红包视频app');
        var isHasApp = Common.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(20000);//等待20s
        this.lookVideo();
    },  
    lookVideo:function(){
        //切换到首页
        while(true){
            var sleepCount = random(8000,20000);
            if(sleepCount<12000){
                sleepCount = 1000;
            }
            sleep(sleepCount);
            swipe(Common.width/2,Common.height/8*7,Common.width/2,Common.height/8*1,1000);
        }
    }
};

//多线程
toast('主线程启动运行！！');
//1。启动刷宝app
MyThread.startOne(shuabao.init.bind(shuabao)); 
setTimeout(() => {
    //当前脚本运行60分钟
    MyThread.disposeThread();
    Common.closeApp();
    toast('停止运行刷宝');
    sleep(1000);
    MyThread.startOne(souhu.init.bind(souhu)); 
}, 60*60*1000);

//2.启动搜狐资讯app
setTimeout(() => {
     MyThread.disposeThread();
     Common.closeApp();
     toast('停止运行搜狐资讯app');
     sleep(1000);
     MyThread.startOne(qukantianxia.init.bind(qukantianxia));   
}, 120*60*1000);

//3.启动趣看天下app
setTimeout(() => {
    MyThread.disposeThread();
    Common.closeApp();
    toast('停止运行趣看天下app');
    sleep(1000);
    MyThread.startOne(hongbao.init.bind(hongbao));   
}, 180*60*1000);

//4.启动红包视频app
setTimeout(() => {
    MyThread.disposeThread();
    Common.closeApp();
    toast('停止运行红包视频app');
    sleep(1000);   
}, 300*60*1000);

