"auto";
const utils = require('utils.js');
//create by wangguagnbin

var zhognqing = {
    appName:'中青看点',
    appPackageName:'cn.youth.news',
    init:function(){
        toast(this.appName);
        var isHasApp = utils.startAPP(this.appName);
        if(!isHasApp) return;
        sleep(2000);
        this.taskCenterPage();//1. 开局，任务中心撸一波
    },

    //1. 个人中心来一波
    taskCenterPage:function(){
        utils.clickBottomTab(4,3); //点击底部tab
        sleep(500);
        var clickResult = utils.clickById('tv_sign');//签到
    },
}

zhognqing.init();