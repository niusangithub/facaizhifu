var util = {};
//add by wangguangbin，此文件可使用import方式导入使用
util.width = device.width, //设备的宽
util.height =  device.height, //设备的高
//通过名字||包名，启动app
util.startAPP = function (name) {
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
util.closeApp = function(packageName){
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
util.findDomById = function (idStr) {
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
util.findDomByText = function (txt) {
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
util.findDomByDesc = function(txt){
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
util.findDomInsideByText = function(txt,x,y,x1,y1){
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
util.clickById = function(eleId){
    var isflag = false; //是否存在
    var dom = id(eleId).find();
    if(dom){
        isflag = true;
        dom.click();
        sleep(1000);
    }
    return isflag;
},
//通过text，点击控件
util.clickByText = function(txt){
    var isflag = false; //是否存在
    var dom = text(txt).find();
    if(dom){
        isflag = true;
        dom.click();
    }
    sleep(1000);
    return isflag;
},
//点击包含指定文本的控件
util.clickByContainsText = function(txt){
    var isflag = false; //是否存在
    var dom = textContains(txt).find();
    if(dom){
        isflag = true;
        dom.click();
    }
    sleep(1000);
    return isflag;
},
    //通过desc，点击控件
util.clickByDesc = function(txt){
    var isflag = false; //是否存在
    var dom = desc(txt).find();
    if(dom){
        isflag = true;
        dom.click();
    }
    sleep(1000);
    return isflag;
},

//双击点赞
util.doubleClick = function(x,y){
    click(x,y);
    sleep(100)
    click(x,y);
},

//通过UI文本的坐标点击，并返回是否成功
util.textBoundsClick = function(textContent) {
    var thisEle = text(textContent).find();
    var flag = false;
    if (!thisEle.empty) {
        util.boundsClick(thisEle);
        flag = true;
    }
    sleep(1000);
    return flag;
}

//通过控件坐标点击
util.boundsClick = function(item) {
    var bounds = item.bounds();
    var flag = false;
    if(bounds){
        click(bounds.centerX(),bounds.centerY());
        flag = true;
    }
    sleep(1000);
    return flag;
}

//滑动阅读新闻
util.swapeToRead = function() {
    var swapetime= random(2000,6000);
    swipe(device.width / 2, device.height * 0.8 ,
        device.width / 2, device.height * 0.5, swapetime);
    toast('中场休息');
    var sleeptime = random(1000,3000);
    sleep(sleeptime);
}

//以下方法，root权限才可用
util.tap = function (x, y) {
    var ra = new RootAutomator();
    //让"手指1"点击位置(100, 100)
    toast("点击");
    ra.press(x, y, 1);
    ra.exit();
},
util.swipe = function () {
    var ra = new RootAutomator();
    ra.swipe(Common.width / 2, Common.height * 0.8, Common.width / 2, Common.height / 8 * 0.4, 1000);
    ra.exit();
},

module.exports = util;