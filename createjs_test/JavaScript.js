
let canvas;
let stage;
let clock;
let bg;
let points = [];
let images = [];
let centerPos = {x:0,y:0}

function init() {
    var stage = new createjs.Stage("demoCanvas");
    stage.autoClear = false;
    var line = new createjs.Shape();
    line.graphics
        .setStrokeStyle(12, "round") // 線幅(端を角丸に)
        .beginStroke("gray")
        .moveTo(0, 0)
        .lineTo(0, -120); // 垂直上方向に線を描く
    //circle.graphics.beginFill("Crimson").drawLine(0, 0, 50,50);
    line.x = 400;
    line.y = 400;
    stage.addChild(line);
    //createjs.Tween.get(line, { loop: false })
    //    .to({ rotation: 360 }, 2000)

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", handleTick);
}

let r = 0;
let handleTick = function () {
    //for (var i = 0; i < points.length; i++) {
    //    if (Math.abs(points[i].x - centerPos.x) >= 1 || Math.abs(points[i].y - centerPos.y) >= 1) {
    //        points[i].x -= 1 * Math.cos(points[i].radian);
    //        points[i].y -= 1 * Math.sin(points[i].radian);
    //    }
    //}
    //canvas.width = window.innerWidth;
    // 薄く暗く塗る
    var line = new createjs.Shape();
    line.graphics
        .setStrokeStyle(1, "round") // 線幅(端を角丸に)
        .beginStroke("gray")
        .moveTo(0, 0)
        .lineTo(0, -120+r); // 垂直上方向に線を描く
    //circle.graphics.beginFill("Crimson").drawLine(0, 0, 50,50);
    line.x = 400;
    line.y = 400;
    line.rotation = r++;
    stage.addChild(line);
}
