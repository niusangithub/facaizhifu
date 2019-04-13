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
    clickByContainsText:function(txt){
        var isflag = false; //是否存在
        var dom = textContains(txt).find();
        if(!dom.empty()){
            console.log(dom);
            isflag = true;
            dom.click();
        }
        console.log(isflag);
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
//东方头条
var dongfangtoutiao = {
    appName: '东方头条', 
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
    //在某个范围内通过text寻找控件
    findDomInsideByText:function(txt,x,y,x1,y1){
        var dom_txt = textContains(txt).boundsInside(x,y,x1,y1).find();
        if (dom_txt.empty()) {
            toast('没有找到：' + txt);
            return null;
        } else {
            toast('找到了：' + txt);
            return dom_txt;
        }
    },
    lookOneArticle:function(){
        //开始看文章了       
        var dom_adv = dongfangtoutiao.findDomInsideByText('广告',0,329,1080,1463);    
        
        if(!dom_adv){
            //不是广告位
            toast('不是广告');
            click(Common.width/2,400);
            sleep(2000);//等待文章加载
            className("android.view.View").depth(9).findOne().click();
            var dom_fenx = Common.findDomByDesc('javascript:;');
                if(dom_fenx){
                    dom_fenx.click();
                }
            sleep(1000);
            var isAlltxt=1;//记录详细页是否找到了查看全文，1为未找到，0为找到了，一个详细页只有一个查看全文
            for(var i=0;i<14;i++){                
                var scrollHeight = random(800,1000);//滑动的距离
                if(i>6){
                    scrollHeight = random(50,100);  
                }
                var sleepTime = random(1200,2000);//睡眠时长
                if(isAlltxt==1){
                    var dom_lookall = Common.findDomByDesc('点击查看全文');
                    if(dom_lookall){
                        isAlltxt=0;
                        dom_lookall.click();
                        sleep(500);
                        
                    }
                }
                
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
        // toast("首页");
        //点击顶部导航栏
        //click(80,700);
        this.lookOneArticle();
       
        sleep(1000);
        for(var i=0;i<300;i++){
            this.lookOneArticle();
            swipe(Common.width / 2, Common.height / 6 * 5, Common.width / 2, 200, 600);    
        }
        // console.log(dom_adv);
        // console.show();
    }
}

dongfangtoutiao.init();