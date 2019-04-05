/*
 * @Author: mikey.quanyj 
 * @Date: 2019-04-05 17:42:49 
 * @Last Modified by: mikey.quanyj
 * @Last Modified time: 2019-04-05 21:28:17
 * 
 * 脚本运行期间请勿用手触摸
 */

const autoConfig = require('./config');
//新闻类的列表
var newsList = autoConfig.newsAppList;
//视频类的列表
var videoList = autoConfig.videoAppList;
var thread = null;
var sum = null;




function init() {
    registerStopEvent();
    //每次阅读的时间
    sum = events.emitter(threads.currentThread());
    sum.on('result', function (result) {
        console.log("result线程==", threads.currentThread());
        stopCurrent();
        thread.interrupt();
        console.log("子线程是否存活", thread.isAlive());
        thread = null;
        let nextIndex = result.index + 1;
        console.log("index===", nextIndex);
        if (newsList[nextIndex]) {
            startNewApp(nextIndex);
        } else {
            console.log("结束");
            destory();
        }

    });
    startNewApp(0);

}
/**
 * 结束运行app
 */
function destory() {
    if (thread) {
        thread.interrupt();
    }
    thread = null;
    back();
    sleep(2000);
    back();
    sleep(2000);
    exit();
    engines.stopAll();
    threads.shutDownAll();
    console.log("当前运行的脚本==", engines.all());
}

function startNewApp(index) {
    var that = this;
    console.log("主线程==", threads.currentThread());
    //注册当前的事件
    thread = threads.start(function () {
        let item = newsList[index];
        //在新线程执行的代码
        let exectuion = that.exec(item.name, item.time * 60);
        console.log("子线程==", threads.currentThread());
        //在子线程执行的定时器
        let timeout = setTimeout(function () {
            exectuion.getEngine().forceStop();
            //发送事件result通知主线程接收结果
            sum.emit('result', {
                index: index,
                scriptName: item.name
            });
            clearTimeout(timeout);
        }, item.time * 60 * 1000);
    });


}
//执行脚本
function exec(scriptName, seconds) {
    //开始执行
    var startDate = new Date(); //开始时间
    return exectuion = engines.execScriptFile("/sdcard/脚本/" + scriptName + ".js");


    // //计时器，检测时间
    // var isIExec = true;
    // while (isIExec) {
    //     //计时
    //     var runSeconds = ((new Date().getTime()) - startDate.getTime()) / 1000;
    //     toast(scriptName + "已执行" + runSeconds + "秒");
    //     if (runSeconds > seconds) {
    //         isIExec = false;
    //     }

    //     sleep(60 * 1000); //每一分钟检测一次

    //     //检测当前执行的任务是否已经完成
    //     //如果发现只有一个进程，则跳转到下一个
    //     if (engines.all().length < 2) {
    //         isIExec = false;
    //         stopCurrent(exectuion);
    //     }
    // }
    // //停止脚本
    // stopCurrent(exectuion);
}

//停止当前脚本
function stopCurrent(exectuion) {
    toast("执行停止");
    sleep(2000);
    back();
    sleep(1000);
    back();
    sleep(1000);
    home();
    sleep(5000);
    back();
}


function registerStopEvent() {
    events.observeKey();
    events.on("key_down", function (keyCode, event) {
        toast("菜单键按下" + keyCode);
        //处理按键按下事件
        if (keyCode == keys.back || keyCode == keys.menu || keyCode == keys.home) {
            toast("菜单键按下");
            destory();
        }
    });
    events.onKeyDown("volume_up", function (event) {
        toast("音量上键被按下了");
        destory();
    });
    //监听菜单键按下
    events.onKeyDown("menu", function (event) {
        toast("菜单键被按下了");
        destory();
    });

    //启用触摸监听
    events.observeTouch();
    //注册触摸监听器
    events.onTouch(function (p) {
        toast("停止事件");
        destory();
    });
}

auto();
console.show();
init();