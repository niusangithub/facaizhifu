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


/* 此多线程方法为简陋版，后期更新 */
var FnAction = {
    fnArray:[],
    minutes:[], //每个app运行的时间
    addFn:function(fn,minute){
        this.fnArray.push(fn);
        this.minutes.push(minute||60);
    },
    executeFn:function(){
        for(var i=0;i<this.fnArray.length-1;i++){
            var cFn = this.fnArray[i];
            var cMinute = this.minutes[i];
            var cFn1 = this.fnArray[i+1];
            var cMinute1 = this.minutes[i+1];
            if(i==0){
                MyThread.startOne(cFn);
            }     
            setTimeout(() => {
                MyThread.disposeThread();
                Common.closeApp();
                MyThread.startOne(cFn1);                
            }, 1000*60*cMinute);

            //停止最后一个脚本
            if(i==this.fnArray.length-1){
                setTimeout(() => {
                    MyThread.disposeThread();
                    Common.closeApp();
                }, 1000*60*cMinute1);
            }    
        }
    }
}

// FnAction.addFn(shuabao.init.bind(shuabao));
function fn1(){
    toast('1');
}

function fn2(){
    toast('2');
}
FnAction.addFn(fn1,1);
FnAction.addFn(fn2,2);
FnAction.executeFn();



toast('主线程启动运行！！');
// MyThread.startOne(shuabao.init.bind(shuabao)); //启动头条多多
// setTimeout(() => {
//     //当前脚本运行60分钟
//     MyThread.disposeThread();
//     Common.closeApp();
//     toast('停止运行头条多多');
//     sleep(1000);
//     MyThread.startOne(shuabao.init.bind(shuabao)); //启动刷宝app
// }, 60*60*1000);

// //两个小时候，结束刷宝app
// setTimeout(() => {
//      MyThread.disposeThread();
//      Common.closeApp();
//      toast('停止运行刷宝');
//      sleep(1000);
// }, 120*60*1000);



