"auto";
const utils = require('./utils');
const autoUtils = utils.init(true);
//红包视频
var hongbao = {
    packageName:'红包视频',
    init:function(){
       
        // var dom_adv = autoUtils.findDomByText('广告');
        // return;
        toast('启动红包视频app');
        var isHasApp = autoUtils.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(15000);//等待20s
        this.lookVideo();
    },  
    lookVideo:function(){
        //切换到首页
        while(true){
             var sleepCount = random(20000,25000);
            //检测是否为广告1
            var dom1 = autoUtils.findDomById('tt_video_ad_close');
            if(dom1){
                dom1.click();
                sleepCount = 1000;                
            }
            sleep(1000);
            //检测是否为广告2
            var dom_adv = autoUtils.findDomByText('广告');
            if(dom_adv){
                sleepCount = 1000;    
            }
            sleep(sleepCount);
            swipe(autoUtils.width/2,autoUtils.height/8*7,autoUtils.width/2,autoUtils.height/8*1,1000);
        }
    }
};
hongbao.init();