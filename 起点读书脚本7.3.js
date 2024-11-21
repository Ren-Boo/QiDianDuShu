console.show()
auto.waitFor()
console.setTitle("7.3");
console.setPosition(0, device.height / 1.6)
console.setSize(device.width / 2, device.width / 2)
if (auto.service == null) {
    log("请先开启无障碍服务！");
} else {
    log("无障碍服务已开启");
    log("开启静音");
    device.setMusicVolume(0)
    home()
    sleep(1000);
    launch("com.qidian.QDReader");
    waitForPackage("com.qidian.QDReader");
    do {
        sleep(1000);
        if (text("书架").exists() && text("精选").exists() && text("发现").exists() && text("我").exists()) {
            break;
        } else {
            log("缓冲……")
        }
    }
    while (!(text("书架").exists() && text("精选").exists() && text("发现").exists() && text("我").exists()))
    sleep(3000);
    back()
    if (text("书架").exists() && text("精选").exists() && text("发现").exists() && text("我").exists()) {
        log("起点已启动成功");
        sleep(1000);
        var thread = threads.start(
            function time() {
                //计时
                let shuzi = 0;
                do {
                    sleep(1000);
                    shuzi++
                }
                while (shuzi < 15);
                log("脚本运行异常,请将起点、auto.js后台清理后尝试重新运行");
                engines.stopAllAndToast()
            }
        );
        swipe(device.width - 50, device.height / 4, device.width - 50, device.height / 2, 500)
        sleep(3000);
        //方案一
        let uc = id("viewPager").className("androidx.viewpager.widget.ViewPager").scrollable(true).findOne().bounds()
        var x1 = uc.right;
        var y1 = uc.bottom;
        click((x1 - 10), (y1 + 10))
        //方案二
        // click(device.width - 150, device.height - 150)
        //方案三
        // id("view_tab_title_title").className("android.widget.TextView").text("我").findOne().parent().click()
        sleep(3000);
        if (text("福利中心").exists()) {
            log("成功打开“我”");
            thread.interrupt()
            log("关闭纠错线程");
            click("福利中心", 0)
            do {
                log("缓冲中……");
                sleep(1000);
            }
            while (!(className("android.view.View").text("每日视频福利").exists() || text("每日福利").exists()));
            log("已进入福利中心");
            log("———————");
            sleep(5000);
            if (textContains("立即开启").exists()) {
                click("立即开启", 0)
                sleep(3000);
                if (textContains("恭喜你获得").exists()) {
                    back()
                    sleep(3000);
                }
                click("福利中心", 0)
                do {
                    log("缓冲中……");
                    sleep(1000);
                }
                while (!(className("android.view.View").text("每日视频福利").exists() || text("每日福利").exists()));
                log("重新进入福利中心");
                log("———————");
            }
            //每日视频
            if (textContains("每日福利").exists()) {
                do {
                    log("每日视频")
                    sleep(1000);
                    if (textContains("看视频领福利").exists()) {
                        className("android.widget.Button").textContains("看视频领福利").click();
                        video_look()
                        sleep(2000);
                        if (textContains("我知道了").exists()) {
                            click("我知道了", 0)
                        }
                        sleep(3000);
                    } else {
                        break;
                    }
                } while (text("看视频领福利").exists());
                if (textContains("恭喜你获得").exists()) {
                    back()
                    sleep(3000);
                }
                if (textContains("看视频开宝箱").exists()) {
                    log("开宝箱");
                    textContains("看视频开宝箱").click()
                    video_look()
                    sleep(2000);
                    if (textContains("我知道了").exists()) {
                        click("我知道了", 0)
                    }
                    log("宝箱开完了");
                } else {
                    log("宝箱开完了");
                }
            } else {
                do {
                    log("每日视频")
                    sleep(1000);
                    if (text("明天再来吧").exists()) {
                        break;
                    } else {
                        var video_sum = className("android.widget.Button").findOne().text()
                        log(video_sum)
                        var video_loop = video_sum.charAt(2);
                        if (video_loop == "再") {
                            break;
                        } else {
                            className("android.widget.Button").textContains("看第").click();
                            video_look()
                            sleep(2000);
                            if (textContains("我知道了").exists()) {
                                click("我知道了", 0)
                            }
                            sleep(3000);
                        }
                    }
                }
                while (video_loop != "再" || video_loop <= 8);
                if (textContains("恭喜你获得").exists()) {
                    back()
                    sleep(3000);
                }
            }
            sleep(3000);
            log("每日视频福利已刷完，开始刷限时任务");
            log("———————");
            //限时任务
            let k = 0
            do {
                log("限时任务")
                if (text("看视频").exists()) {
                    text("看视频").findOne().click()
                } else {
                    break;
                }
                sleep(3000);
                if (text("可从这里回到福利页哦").exists()) {
                    click("我知道了", 0)
                }
                video_look()
                sleep(3000);
                if (text("我知道了").exists()) {
                    click("我知道了", 0)
                    k++
                    sleep(3000);
                }
                console.log("已完成限时任务", k);
                if (k > 2) {
                    break;
                }
            }
            while (text("看视频").exists());
            log("听书");
            if (text("当日听书1分钟").exists()) {
                let ts1 = text("当日听书1分钟").findOne().bounds()
                let x1 = ts1.right;
                let y1 = ts1.bottom;
                ts1.right = Number(ts1.right) + Number(5)
                click(x1, y1)
                sleep(3000);
                if (text("听原创小说").exists()) {
                    let abscissa = device.width;
                    let ordinate = device.height;
                    let abscissa_new = abscissa / 2
                    let ordinate_new = ordinate / 2
                    click(abscissa_new, ordinate_new)
                    sleep(3000);
                }
                if (text("免费听").exists() || text("定时").exists() || text("加书架").exists() || text("目录").exists()) {
                    sleep(3000);
                    let i = 0;
                    do {
                        i++
                        sleep(1000);
                        console.log("已收听", i + "秒")
                        if (!(i % 10)) {
                            console.log("防休眠点击")
                            click(1, 1)
                        }
                    }
                    while (i < 70);
                    back()
                    sleep(3000);
                    if (textContains("加入书架").exists()) {
                        click("取消", 0)
                    }
                    sleep(3000);
                    if (text("听原创小说").exists()) {
                        do {
                            log("缓冲中……");
                            sleep(1000);
                        }
                        while (!text("听原创小说").exists());
                        back()
                    }
                    do {
                        log("缓冲中……");
                        sleep(1000);
                    }
                    while (!text("福利中心").exists());
                    back()
                    do {
                        log("缓冲中……");
                        sleep(1000);
                    }
                    while (!text("我的账户").exists());
                    click("福利中心", 0)
                    do {
                        log("缓冲中……");
                        sleep(1000);
                    }
                    while (!(className("android.view.View").text("每日视频福利").exists() || text("每日福利").exists()));
                    sleep(1000);
                    if (id("ivClose").exists()) {
                        id("ivClose").findOne().click()
                    } else {
                        console.log("未知原因，找不到关闭按钮，请手动关闭")
                    }
                    sleep(1000);
                    if (text("领奖励").exists()) {
                        click("领奖励", 0)
                        sleep(2000);
                        if (text("我知道了").exists()) {
                            click("我知道了", 0)
                            sleep(1000);
                        }
                    }
                    log("听书完成");
                } else {
                    console.log("听书活动已完成")
                }
            } else {
                console.log("听书活动已结束")
            }
            log("限时任务，已完成，开始签到");
            log("———————");
            //签到
            back()
            sleep(1000);
            back()
            sleep(1000);
            // swipe(1200, 1679, 1200, 2480, 500)
            sleep(1000);
            if (text("签到").exists()) {
                click("签到", 0)
                sleep(2000);
                back()
                log("已点击签到");
            } else {
                log("已签到过了");
            }
            sleep(3000);
            log("———————");
            log("刷今日福利");
            log("———————");
            //今日福利
            if (text("今日福利").exists() || text("去抽奖").exists() || text("签到福利").exists()) {
                if (text("去抽奖").exists()) {
                    click("去抽奖", 0)
                    sleep(3000);
                    if (textContains("剩余") && ((className("android.view.View").text("抽 奖").exists()) || className("android.view.View").text("看视频抽奖喜+1").exists())) {
                        back()
                        sleep(1000);
                        click("今日福利", 0)
                    }
                } else if (text("今日福利").exists()) {
                    click("今日福利", 0)
                } else if (text("签到福利").exists()) {
                    click("签到福利", 0)
                }
                sleep(3000);
                if (textContains("当前连续签到").exists()) {
                    let qiandao = textContains("当前连续签到").findOne().text()
                    log(qiandao)
                    //连签礼包
                    log("连签礼包活动")
                    if (textContains("连签礼包").exists()) {
                        sleep(2000);
                        textContains("连签礼包").findOne().click()
                        sleep(2000);
                        back()
                        sleep(2000);
                        log("连签礼包已领取")
                    } else {
                        log("连签礼包活动结束")
                    }
                    log("———————");
                    if (textContains("章节卡碎片").exists()) {
                        log("签到领章节卡活动");
                    } else {
                        log("签到翻倍经验活动");
                    }
                    if (text("去翻倍").exists()) {
                        text("去翻倍").findOne().click()
                        video_look()
                        sleep(2000);
                        if (text("我知道了").exists()) {
                            click("我知道了", 0)
                            sleep(2000);
                        }
                        if (textContains("章节卡碎片").exists()) {
                            log("签到领章节卡活动结束");
                        } else {
                            log("签到翻倍经验活动结束");
                        }
                    } else {
                        if (textContains("章节卡碎片").exists()) {
                            log("签到领章节卡已完成");
                        } else {
                            log("签到翻倍机会已用完");
                        }
                    }
                    log("———————");
                    log("返回主界面")
                    back()
                } else {
                    log("———————");
                    log("未进入今日福利");
                }
            } else {
                log("———————");
                log("今日福利点击失败");
            }
            log("———————");
            sleep(1000);
            // var mokuai_jilisuipian = require('激励碎片.js');
            // mokuai_jilisuipian.step()
            log("脚本已结束，记得清理auto.js后台");
            log("控制台3秒后自动关闭");
            sleep(3000);
            console.hide()
            engines.stopAllAndToast()
        } else {
            log("未成功打开“我”");
        }
    } else {
        log("起点未启动成功，请查看日志查询原因");
    }
}
function video_look() {
    //计时
    log("———————");
    log("看视频");
    sleep(2000);
    if (textContains("播放将消耗流量").exists()) {
        click("继续播放", 0)
    }
    //判断是否进入视频播放页面
    let m = 0;
    do {
        m++
        sleep(1000);
        if (textContains("可获得奖励").exists()) {
            break;
        } else {
            log("缓冲……")
        }
        if (m > 5 && !(textContains("领取奖励").exists()||textContains("可获得奖励").exists())) {
            return;
        }
    }
    while (!textContains("可获得奖励").exists())
    //获取退出坐标
    var video_quit = "";
    var x1 = 1;
    var x2 = 1;
    var y1 = 1;
    var y2 = 1;
    var thread = threads.start(
        function coordinate() {
            sleep(3000);
            if (textContains("可获得奖励").exists() && !video_quit) {
                video_quit = textContains("可获得奖励").findOne().bounds()
                x1 = 0;
                x2 = video_quit.left;
                y1 = video_quit.top;
                y2 = video_quit.bottom;
                console.log("退出坐标", parseInt((x1 + x2) / 2), parseInt((y1 + y2) / 2))
            } else {
                console.log("计算退出坐标失败，稍后重新获取")
            }
        }
    );
    var video_flag = "";//视频文字信息
    //判断视频是否播放到满足领取奖励条件
    var storage = "";
    do {
        if (textContains("可获得奖励").exists()) {
            if (textContains("观看完视频").exists()) {
                video_flag = "观看完视频,可获得奖励"
            }
            if (textContains("观看视频").exists()) {
                video_flag = textContains("观看视频").findOne().text()
            }
            if (textContains("有声书").exists()) {
                video_flag = textContains("有声书").findOne().text()
            }
            if (video_flag != storage && storage.length <= 0) {
                console.log(video_flag)
            }
            if (video_flag != storage && storage.length > 0) {
                console.log(video_flag)
                if (video_flag.includes("视频0秒") || video_flag.includes("收听0秒")) {
                    console.log("结束");
                    sleep(1500);
                    break;
                }
            }
            storage = video_flag;
        } else {
            if (video_flag.includes("观看完视频")) {
                console.log("结束");
                sleep(1500);
                break;
            }
        }
        if (textContains("继续观看").exists()) {
            textContains("继续观看").click()
            sleep(1500);
        }
        if (textContains("继续听完").exists()) {
            textContains("继续听完").click()
            sleep(1500);
        }
    }
    while (!video_flag.includes("已"));
    thread.interrupt()
    //退出视频
    let n = 0;
    do {
        n++
        if (n == 1) {
            click(parseInt((x1 + x2) / 2), parseInt((y1 + y2) / 2))
        } else if (n > 1 && textContains("可获得奖励").exists()) {
            log("退出失败，重新获取退出坐标")
            if (textContains("跳过广告").exists()) {
                text("跳过广告").findOne().click()
            } else if (textContains("跳过视频").exists()) {
                text("跳过视频").findOne().click()
            } else {
                if (textContains("可获得奖励").exists()) {
                    video_quit = textContains("可获得奖励").findOne().bounds()
                }
                x1 = 0;
                x2 = video_quit.left;
                y1 = video_quit.top;
                y2 = video_quit.bottom;
                var bounds = true;
                do {
                    var x = random(x1, x2);
                    var y = random(y1, y2);
                    console.log("区域随机点击", x, y)
                    click(x, y);
                    if (textContains("继续观看").exists()) {
                        textContains("继续观看").click()
                        sleep(1500);
                    }
                    if (textContains("继续听完").exists()) {
                        textContains("继续听完").click()
                        sleep(1500);
                    }
                }
                while (textContains("可获得奖励").exists());
            }
        } else if (!textContains("可获得奖励").exists()) {
            log("尝试模拟“手势返回”")
            back()
        } else {
            log("未知原因退出失败，脚本停止运行")
            engines.stopAllAndToast()
        }
        sleep(3000);
    }
    while (!(textContains("福利中心").exists() || textContains("视频奖励").exists() || text("签到").exists()));
    log("关闭视频")
    log("———————");
}
