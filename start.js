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
            setTimeout(function(){
                toast('子线程中启动：'+threads.currentThread());
                callback();
            }, 1000);
        });
        this.childThread.waitFor();
    },
    disposeThread:function(){
        if(this.childThread){
            this.childThread.interrupt();
        }
    }

};
//头条多多
var toutiaoduoduo = {
    appName: '头条多多',
    init: function () {
        toast(this.appName);
        var isHasApp = Common.startAPP(this.appName);
        if(!isHasApp)return;     
        sleep(15000);//等待15s
        //this.todoTask(); //晒收入
        this.lookArticle();
    },
    //任务： 签到、晒收入
    todoTask: function () {
        toast("赚钱");
        click(540, 1776, 810, 1920);
        sleep(1000);
        //签到

        //晒收入
        for (var i = 0; i < 3; i++) {
            swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, 50, 600);
            sleep(200);
        }
        var dom_share = Common.findDomByText('晒收入');
        if(dom_share){          
            click(820,740);
            sleep(6000);
            //晒微信好友
            for(var i=0;i<2;i++){
                shareAction(480,1700,1);
            }
            //晒朋友圈
            for(var i=0;i<2;i++){
                shareAction(800,1700,2);
            }
            back();
        }

        function shareAction(x,y,type){
            click(x,y);
            sleep(5000);//等待8s
            back();
            if(type==2){
                //朋友圈
                sleep(1500);
                var dom_bubaoliu = Common.findDomByText('不保留');
                dom_bubaoliu.click();

            }else{
                sleep(500);
                back();
            }          
            sleep(2000);
        }
    },
    lookOneArticle:function(){
        //开始看文章了       
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
            //拉到文章最末尾
            var count = random(20,25);
            for(var i=0;i<count;i++){
                swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, 50, 200); 
                sleep(200);   
            }
            back();
        }
        sleep(1000);
    },
    //看文章
    lookArticle:function(){
        toast("首页");
        click(100,1826);
        sleep(1000);
        for(var i=0;i<300;i++){
            this.lookOneArticle();
            swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, 800, 600);    
        }
        // console.log(dom_adv);
        // console.show();
    }

}
//刷宝app
var shuabao = {
    packageName:'com.jm.video',
    init:function(){
        var isHasApp = Common.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(15000);//等待15s
        this.todoTask();
        this.lookVideo();
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
        sleep(500);
        //关闭弹窗
        this.closeTaskBox();
        sleep(300);
        //开宝箱
        click(850,1350);
        sleep(300);
        click(834,432);
        sleep(100);
        click(507,1347);
        //签到
        var dom_sign = Common.findDomByText('立即签到');
        if(dom_sign){
            dom_sign.click();
            sleep(500); 
            click(834,432);   
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
            swipe(Common.width/2,Common.height/8*7,Common.width/2,Common.height/8*1,1000);
        }
    }    

};
//以下代码意思是： 
//先运行头条多多1个小时； 
//然后结束头条多多脚本，继续运行 刷宝视频1小时；

/* 此多线程方法为简陋版，后期更新 */
toast('主线程启动运行！！');
MyThread.startOne(toutiaoduoduo.init.bind(toutiaoduoduo)); //启动头条多多
setTimeout(() => {
    //当前脚本运行60分钟
    MyThread.disposeThread();
    Common.closeApp();
    toast('停止运行头条多多');
    sleep(1000);
    MyThread.startOne(shuabao.init.bind(shuabao)); //启动刷宝app
}, 60*60*1000);

//两个小时候，结束刷宝app
setTimeout(() => {
     MyThread.disposeThread();
     Common.closeApp();
     toast('停止运行刷宝');
     sleep(1000);
}, 120*60*1000);



