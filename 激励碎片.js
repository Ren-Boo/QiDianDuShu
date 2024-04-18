console.show()
auto.waitFor()
console.setTitle("激励碎片1.1.2");
console.setPosition(0, device.height / 1.6)
console.setSize(device.width / 2, device.width / 2)
var circle = {};
//操作步骤函数
circle.step = function () {
    do {
        if (text("御兽之王").exists()) {
            click("御兽之王", 0)
            break;
        } else {
            console.log("未找到继续下滑")
            swipe(device.width - 50, device.height / 2, device.width - 50, device.height / 4, random(500, 1000))
        }
        sleep(1000);
    }
    while (true);
    var abscissa = device.width;
    var ordinate = device.height;
    var abscissa_new = abscissa / 2
    var ordinate_new = ordinate / 2
    sleep(3000);
    do {
        log("________");
        click(abscissa_new, ordinate_new)
        log("打开工具栏");
        sleep(1000);
        let jishu = 0;
        if (text("畅所欲言").exists() || textContains("正在讨论").exists() || textContains("发言粉丝值").exists() || textContains("书友正在讨论").exists() || (text("全部").exists() && text("配音").exists())) {
            back()
            sleep(1000);
            swipe(device.width / 4, device.height / 2, device.width - 100, device.height / 2, random(500, 1000))
            sleep(1000);
            log("点击错误重新计算坐标");
            ordinate_new = Number(ordinate_new) + Number(10)
            console.log("点击坐标", abscissa_new, ordinate_new)
            click(abscissa_new, ordinate_new)
            if (jishu > 10) {
                log("未知原因，打开工具栏异常");
                engines.stopAllAndToast()
            }
            sleep(1000);
        }
    }
    while (!(text("订阅").exists() && text("月票").exists()));
    log("准备进入目录");
    do {
        click("目录", 0)
        sleep(3000);
    }
    while (!(text("热门").exists() || text("足迹").exists()));
    log("已进入目录");
    log("纠正初始页");
    if (text("去底部").exists()) {
        click("去底部", 0)
        sleep(3000);
    }
    if (text("去当前").exists()) {
        click("去当前", 0)
        sleep(3000);
    }
    if (text("去顶部").exists()) {
        click("去顶部", 0)
        sleep(3000);
    }
    log("纠正完毕，进入初始章节");
    click(abscissa_new, ordinate_new)
    sleep(3000);
    let bu = true
    let s = 0
    let suipian = 0
    do {
        ordinate_new = ordinate / 2
        s++
        let jishu = 0;
        do {
            log("________");
            click(abscissa_new, ordinate_new)
            log("领取碎片");
            sleep(1000);
            if (text("畅所欲言").exists() || textContains("正在讨论").exists() || textContains("发言粉丝值").exists() || textContains("书友正在讨论").exists() || (text("全部").exists() && text("配音").exists())) {
                back()
                sleep(1000);
                swipe(device.width / 4, device.height / 2, device.width - 100, device.height / 2, random(500, 1000))
                sleep(1000);
                log("点击错误重新计算坐标");
                ordinate_new = Number(ordinate_new) + Number(10)
                console.log("点击坐标", abscissa_new, ordinate_new)
                click(abscissa_new, ordinate_new)
                if (jishu > 10) {
                    log("未知原因，打开工具栏异常");
                    engines.stopAllAndToast()
                }
                sleep(1000);
            }
        }
        while (!(text("订阅").exists() && text("月票").exists()));
        do {
            do {
                if (text("下一章").exists()) {
                    click("下一章", 0)
                    sleep(3000);
                }
                if (s > 1) {
                    if (text("下一章").exists()) {
                        click("下一章", 0)
                        sleep(3000);
                    }
                    if (text("下一章").exists()) {
                        click("下一章", 0)
                        sleep(3000);
                    }
                }
                swipe(device.width / 4, device.height / 2, device.width - 100, device.height / 2, 500)
                sleep(3000);
            }
            while (!text("红包").exists());
            if (s > 1) {
                if (text("0个").exists()) {
                    bu = false
                }
            }
            if (text("1个").exists()) {
                click("红包", 0)
                do {
                    log("加载中……");
                }
                while (!text("红包广场").exists());
                sleep(1000);
                if (text("马上抢").exists()) {
                    click("马上抢", 0)
                    circle.look()
                    click("立即领取", 0)
                    suipian++
                    log("已领取" + suipian + "个碎片");
                    sleep(3000);
                }
                if (text("领取成功").exists()) {
                    click("我知道了", 0)
                    sleep(3000);
                }
            }
        }
        while (!text("0个").exists());
    }
    while (bu);
    if(suipian==0){
        log("今日碎片已领取上限，明日再来");
    }
    back()
    log("脚本已结束，记得清理auto.js后台");
    log("控制台3秒后自动关闭");
    sleep(3000);
    console.hide()
};
//看视频函数
circle.look = function () {
    video_look()
};

module.exports = circle
