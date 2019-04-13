"ui";
importClass(android.widget.Button)
importClass('android.view.WindowManager')
importClass('android.view.Gravity')
importClass('android.graphics.PixelFormat')

//UI界面版，主程序
ui.layout(
    <scroll focusable="true"  focusableInTouchMode="true">     
    <vertical padding="20">
          <linear orientation="vertical"></linear>
        <list id="app_list">
            <horizontal>
                <checkbox checked="true" id="{{ck_id}}" text="{{name}}"/> 
                <input  id="{{txt_id}}"  margin-left="10" inputType="number"  text="{{minutes}}"/><text text="分钟" />
            </horizontal>
        </list>
       
       <horizontal margin-top="10">
             <checkbox checked="true" color="#DC143C" id="ck_all" text="全选"/>
             <checkbox margin-left="20" checked="true" color="#DC143C" id="ck_suiji" text="随机打乱顺序"/>
       </horizontal>
       <horizontal>
              <button id="btn_run" style="Widget.AppCompat.Button.Colored" text="更新配置"/>
       </horizontal>
    </vertical>
    </scroll>
);

activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

//随机打乱数组
function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

var UIAutomator ={
    items : [], //配置：app列表； name需要跟脚本名称保持一致
    newList:[],
    clickLocked:false,
    initData:function(){
        this.items = [ 
            {name:'悦头条',minutes:'60',ck_id:'ck_app0',txt_id:'txt_app0'},  
            {name:'刷宝视频',minutes:'60',ck_id:'ck_app1',txt_id:'txt_app1'},
            {name:'红包视频',minutes:'60',ck_id:'ck_app2',txt_id:'txt_app2'},
            {name:'趣看天下',minutes:'60',ck_id:'ck_app3',txt_id:'txt_app3'},
            {name:'惠头条',minutes:'60',ck_id:'ck_app4',txt_id:'txt_app4'},  
            {name:'东方头条',minutes:'60',ck_id:'ck_app5',txt_id:'txt_app5'},  
            {name:'中青看点',minutes:'60',ck_id:'ck_app6',txt_id:'txt_app6'},  
             {name:'天天趣闻',minutes:'60',ck_id:'ck_app7',txt_id:'txt_app7'},  
            {name:'搜狐资讯',minutes:'60',ck_id:'ck_app8',txt_id:'txt_app8'},  
            {name:'橙子快报',minutes:'60',ck_id:'ck_app9',txt_id:'txt_app9'},  
            {name:'牛牛头条',minutes:'60',ck_id:'ck_app10',txt_id:'txt_app10'},  
            {name:'网易新闻',minutes:'60',ck_id:'ck_app11',txt_id:'txt_app11'},  
            {name:'薪头条',minutes:'60',ck_id:'ck_app12',txt_id:'txt_app12'} 
        ];
        ui.app_list.setDataSource(this.items);
    },
    addEvent:function(){
        var that = this;
        //运行
        ui.btn_run.click(function(){
            //一秒只能点击一次
            if(that.clickLocked){return false;}
            that.clickLocked = true;
            setTimeout(() => {
                that.clickLocked=false;
            }, 1000);
           
            that.newList = [];
            for(var i=0;i<that.items.length;i++){
                var cItem = that.items[i];
                if(ui[cItem.ck_id].checked){
                    //获取新的分钟数
                    cItem.minutes = ui[cItem.txt_id].getText();
                    that.newList.push(cItem);
                }
            }
            if(that.newList.length<1){
                toast('请勾选要运行的app');
                return false;
            }
            //打乱顺序
            if(ui.ck_suiji.checked){
                that.newList.sort(randomsort);
            }
            that.writeConfig();
            
        });
        //全选
        ui.ck_all.click(function(){
            var isChecked = ui.ck_all.checked;
            for(var i=0;i<that.items.length;i++){
                ui['ck_app'+i].checked = isChecked;
            } 
        });
       
        setTimeout(() => {
            ui.txt_app0.click();
        }, 2000);

    },
    //更新配置文件
    writeConfig:function(){
        var that =this;
        var filepath = 'config.js';
        var txt = '';
        txt+='var config = { \n';
        txt+='videoAppList:[],\n';
        txt+='newsAppList: [ \n';
        for(var i=0;i<that.newList.length;i++){
            var cItem = that.newList[i];
            txt+= '{ \n';
            txt+= '"name":"'+cItem.name+'", \n';
            txt+= '"version":"1", \n';
            txt+= '"time":"'+cItem.minutes+'" \n}';
            if(i!=that.newList.length-1){
                txt+=', \n';
            }
        }
        txt+='] }\n\n';
        txt+='module.exports = config;';
        files.write(filepath, txt);
        toast('更新成功配置；');
       
    },
    init:function(){
        this.initData();
        this.addEvent();
    }

};

UIAutomator.init();







