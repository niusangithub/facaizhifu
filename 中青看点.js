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
        sleep(2000);5
        // utils.clickById('iv_activity');//马上赚钱-马上领取
        utils.clickById('iv_close');//关闭广告弹窗
        this.taskCenterPage();//1. 开局，任务中心撸一波
    },

    //1. 个人中心来一波
    taskCenterPage:function(){
        utils.clickBottomTab(4,3); //点击底部tab
        sleep(500);
        var signResult = utils.clickById('tv_sign');//签到按钮
        if(signResult){
            sleep(1000);
            //签到领青豆
            var clickSignNow = utils.clickByText('立即签到');
            if(clickSignNow){//取消弹窗
                sleep(500);
                back();
                sleep(500);
            }

            //定时红包领青豆
            var timeRed = utils.clickByText('定时红包');
            if(timeRed){
                var clickGet = utils.clickByText('点击领取');
                if(clickGet){
                    sleep(500);
                    var shareWechat = utils.clickByContainsText('分享到微信群，再得');
                    if(shareWechat){//分享成功返回领取
                        sleep(1000);
                        back();
                    }
                     //邀请好友页面需要返回两次才能回到任务中心页面
                     sleep(500);
                     back();
                     sleep(500);
                     back();
                }

                //任务中心返回"我的"
                sleep(500);
                back();
                sleep(500);
                back();

            }

        }
    },
}
console.show();
zhognqing.init();