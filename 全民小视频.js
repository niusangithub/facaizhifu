"auto";
const utils = require('utils.js');

//全民小视频
var quanminxiaoshipin = {
    appName:'全民小视频',
    appPackageNmae:'com.baidu.minivideo',
    init:function(){
        toast(this.appName);
        var isHasApp = utils.startAPP(this.appName);
        if(!isHasApp) return;
        sleep(5000);
        this.qianDao();
        this.lookVideo();
    },

    //签到
    qianDao:function(){
        click(140,90);
        sleep(5000);
        back();
        sleep(3000);
    },

    //看视频,并且双击
    lookVideo:function(){
        while(true){
            var itemDom = utils.findDomById('index_thumb_parent');
            if(!itemDom){
                return;
            }
            itemDom.click();//进入到视频页面
            var repeatCount = random(5,9);
            for(var i=0;i<repeatCount;i++){ //随机看3-9个视频然后返回，刷新
                var sleepTime = random(5000,20000);
                if(sleepTime < 8000){
                    sleepTime = 5000;
                }else if(sleepTime > 15000){
                    sleep(sleepTime/2);
                    if(sleepTime % 4 == 0){//4的倍数双击   
                        utils.doubleClick(utils.width/2,utils.height/2);
                    }
                    sleep(sleepTime/2);
                }
                if(i != repeatCount-1){
                    swipe(utils.width / 2, utils.height * 0.8, utils.width / 2, utils.height / 8, 1000);
                }
            }
            sleep(2000);
            back();
            toast('返回键');
            sleep(2000);
            
            swipe(utils.width/2,utils.height/8,utils.width/2,utils.height*0.8,1000);
           
            toast('刷新');
            sleep(10000);//等待刷新完成
        }
    },
}

quanminxiaoshipin.init();