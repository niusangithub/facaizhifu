"auto";
const utils = require('./utils');
const autoUtils = utils.init(true);
//红包视频
var hongbao = {
    packageName:'红包视频',
    init:function(){
        toast('启动红包视频app');
        var isHasApp = autoUtils.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(20000);//等待20s
        this.lookVideo();
    },  
    lookVideo:function(){
        //切换到首页
        while(true){
            var sleepCount = random(11000,20000);
            if(sleepCount<13000){
                sleepCount = 1000;
            }
            sleep(sleepCount);
            swipe(autoUtils.width/2,autoUtils.height/8*7,autoUtils.width/2,autoUtils.height/8*1,1000);
        }
    }
};
hongbao.init();