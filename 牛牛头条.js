"auto";
const utils = require('./utils');
const autoUtils = utils.init(false);

//差个关闭签到弹窗的代码

var niuniutoutiao ={
    packageName:'牛牛头条',
    init:function(){
        toast('启动牛牛头条app');
        var isHasApp = autoUtils.startAPP(this.packageName);
        if(!isHasApp)return;     
        sleep(15000);//等待15s        
        this.todotask();    
        this.lookArticle();
    },
   
    //todotask
    todotask:function(){
       toast('打开：每日金币页面');                                                                
       var dom_task = text('每日金币').findOnce().bounds();
       click(dom_task.centerX(),dom_task.centerY());    
       sleep(1000);
        //签到  

    },
    //右上角弹窗
    getMoneyBox:function(){
        var dom_getmoney = autoUtils.findDomById('id_fragment_information_datecoins_layout');
        if(dom_getmoney){
            dom_getmoney.click();
            sleep(1500);
            back();
        }
    },
    lookOneArticle:function(){
        //上次看到这里
        var dom_last = autoUtils.findDomById('id_item_news_list_last_refresh');
        if(dom_last){
            sleep(1000);
            return;
        }
        sleep(1000);
        var dom_adv = autoUtils.findDomInsideByText('广告',0,206,1080,1008);    
        if(!dom_adv&&!dom_last){
            //不是广告位
            click(autoUtils.width/2,400);
            sleep(1500);//等待文章加载
            var repeatCount = random(6,10);
            for(var i=0;i<repeatCount;i++){    
                var dom_all = textContains('展开全文').find();
                if(!dom_all.empty()){
                    dom_all.click();
                    sleep(500);
                }
                autoUtils.swapeToRead(400,1000);
            }
            sleep(1500);
            back();
        }
        sleep(1000);
       
    },
    //看文章
    lookArticle:function(){
        // var dom_task = text('资讯').findOnce().bounds();
        // click(dom_task.centerX(),dom_task.centerY());    
        // sleep(2000);  
        //this.getMoneyBox();  
        this.lookOneArticle();
        var i = 0;
        while(true){
            i++;
            if(i==20){
                this.getMoneyBox();
                i=0;
            }
            swipe(autoUtils.width / 2, autoUtils.height / 6 * 5, autoUtils.width / 2, 900, 600);    
            this.lookOneArticle();
           
        }
    }
};

niuniutoutiao.init();