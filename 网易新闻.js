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
    //双击
    doubleClick:function(x,y){
        click(x,y);
        sleep(100)
        click(x,y);
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
    },

};

var wangyi = {
    packageName:'com.netease.news.lite',
    init:function(){
        toast('启动网易新闻app');
        // var isHasApp = Common.startAPP(this.packageName);
        // if(!isHasApp)return;     
        // sleep(15000);//等待15s
      // this.closeBox();
      // this.todoTask();
        this.lookArticle();

    },
    //关闭弹窗
    closeBox:function(){
        var dom_close = Common.findDomById('u4');
        if(dom_close){
            dom_close.click();
        }
    },
    todoTask:function(){
        // var dom_task = text('任务').findOnce().bounds();
        // click(dom_task.centerX(),dom_task.centerY());
        // sleep(2000);
        //签到
        var dom_sign = Common.findDomByText('签到领金币');
        if(dom_sign){
            dom_sign.click();
            sleep(1000);
            click(530,1700);
        }
        //分享新闻

        //分享收入

        //宝箱

        //40分钟后，领取宝箱

    },
    lookOneArticle:function(){

        //检测右上角是否可以开宝箱
        if(Common.findDomByText('领取40金币')){
            var dom_1 = id('ax8').findOnce();
            dom_1.click();
            sleep(1000);
            click(520,1650);
            sleep(500);
        }

        var dom_adv = Common.findDomInsideByText('广告',0,106,1080,1208);    
        if(!dom_adv){
            //不是广告位
            click(Common.width/2,370);
            sleep(1200);//等待文章加载
            for(var i=0;i<14;i++){                
                var scrollHeight = random(800,1000);//滑动的距离               
                var sleepTime = random(1200,2000);//睡眠时长
                var dom_lookall = Common.findDomByText('查看全文');
                if(dom_lookall){
                    dom_lookall.click();
                    sleep(400);
                }
                swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, scrollHeight, 600);    
                sleep(sleepTime);
            }          
            back();
        }
        sleep(1000);

    },
    lookArticle:function(){
        //首页： 右上角宝箱
        // var dom_task = text('首页').findOnce().bounds();
        // click(dom_task.centerX(),dom_task.centerY());    
        // sleep(1000);       
        for(var i=0;i<300;i++){
            this.lookOneArticle();
            swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, 800, 600);    
        }

    },

    


};
wangyi.init();
