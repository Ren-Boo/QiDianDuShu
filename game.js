var game = {};

game.step = function () {
    if ((textView = findView("当日玩游戏\\d+分钟", "match"))) {
        let layout = textView.parent();
        textView = layout.findOne(text("去完成"));
        if (textView) {
            let playMinutes = 10;
            // 玩游戏
            clickButton(findView("去完成"));
            waitForActivity("com.qidian.QDReader.ui.activity.QDBrowserActivity");
            clickButton(waitView("新游"));
            waitForActivity("com.qidian.QDReader.ui.activity.GameBrowserActivity");
            clickButton(waitView("在线玩"));
            sleep(1000);
            log("保持屏幕常亮");
            device.keepScreenDim();
            for (let i = playMinutes + 1; i > 0; --i) {
                log(`剩余 ${i}min`);
                sleep(60000);
                device.wakeUpIfNeeded();
            }
            log("停止屏幕常亮，游戏挂机结束");
            device.cancelKeepingAwake();
            device.vibrate(500);
            // 游戏页(无标题) - 新游 - 游戏中心 - 福利中心
            do {
                log("回退页面");
                back();
                sleep(1000);
            } while (!findView("福利中心"));
        }
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
    log("玩游戏 结束");
}
    
/**
 * 查找带有某个文本的控件
 * home.php?mod=space&uid=952169 {string} content 查找文本
 * @param {string} mode 查找方式，默认 text，可选 match
 * @returns 第一个符合条件的控件，不存在返回 undefined
 */

function clickButton(view) {
    log("点击 " + view.text());
    // 查找按钮所在控件
    let btn = view;
    while (btn && !btn.clickable()) {
        btn = btn.parent();
    }
    // 点击
    if (btn) {
        btn.click();
        return true;
    }
    return false;
}
function findView(content, mode) {
    log(`查找控件 ${content}`);
    let find;
    if (mode === 'match') {
        find = textMatches(content);
    } else {
        find = text(content);
    }
    return find && find.exists() ? find.findOnce() : undefined;
}

function waitView(content) {
    log(`等待控件 ${content}`);
    let view = text(content);
    view.waitFor();
    return view.findOnce();
}

module.exports = game;