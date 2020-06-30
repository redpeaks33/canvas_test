
let plots = [
    { id: 1, name: 'aaaaa', rate: 1},
    { id: 2, name: 'bbbbb', rate: 1},
    { id: 3, name: 'ccccc', rate: 0.5},
    { id: 4, name: 'ddddd', rate: 0.3},
    { id: 5, name: 'eeeee', rate: 1},
]

let canvas;
let stage;
let clock;
let bg;
let points = [];
let images = [];
let centerPos = {x:0,y:0}
let LIGHT_GREEN = '#00FF00'


function setStage() {
    canvas = document.getElementById("radar-chart");
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.strokeStyle = LIGHT_GREEN;//"#000000";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    stage = new createjs.Stage(canvas);
    radarContainer = new createjs.Container();
    stage.addChild(radarContainer);
    stage.update();
}

let init = function(){
    setStage();

    clock = new createjs.Container();
    clock.x = canvas.width / 2;
    clock.y = canvas.height / 2;
    stage.addChild(clock);

    let radius = canvas.width / 2;
    for (var i = 1; i <= 3; i++) {
        //#region circle
        let circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(5).beginStroke(LIGHT_GREEN).drawCircle(0, 0, radius*i/3);
        clock.addChild(circle);
        //#endregion

        //#region circle name
        let text = new createjs.Text(72 * i / 3 + "h", "24px serif", LIGHT_GREEN);
        text.x = 0;
        text.y = -radius * i / 3;
        text.textAlign = "center";
        text.textBaseline = "top";
        clock.addChild(text);
        //#endregion
    }

    for (var i = 0; i < plots.length; i++) {
        let line = new createjs.Shape();

        let angle = i * (360 / plots.length) - 90;//rotation 90 degree
        let radian = angle * Math.PI / 180;

        //start point 
        centerPos.x = 0 * Math.cos(radian);
        centerPos.y = 0 * Math.sin(radian);

        //end point 
        let endX = radius * Math.cos(radian);
        let endY = radius * Math.sin(radian);

        //#region line
        line.graphics
            .setStrokeStyle(2)
            .beginStroke(LIGHT_GREEN)
            .moveTo(centerPos.x, centerPos.y)
            .lineTo(endX, endY);

        clock.addChild(line);
        //#endregion

        //images
        //let bmp = new createjs.Bitmap("image2.gif");
        //clock.addChild(bmp);

        //bmp.x = endX * plots[i].rate;
        //bmp.y = endY * plots[i].rate;
        //bmp.scaleX = 0.1;
        //bmp.scaleY = 0.1;
        /*
        bmp.regX = 200;
        bmp.regY = 200;
        bmp.radian = radian;
        //let x = bmp.getBounds().width / 2;
        //let y = bmp.getBounds().height / 2;
        images[i] = bmp;
        */

        //#regin point
        let point = new createjs.Shape();
        point.radian = radian;
        let xPos = endX * plots[i].rate;
        let yPos = endY * plots[i].rate;
        point.x = endX * plots[i].rate;
        point.y = endY * plots[i].rate;
        point.graphics
            .beginFill("red")
            .drawCircle(0, 0, 10);
        //
        createjs.Tween.get(point, { loop: true })
            .to({ alpha: 0 }, 1000)

        points.push(point);
        clock.addChild(point);
        //#endregion

        //#region point name
        let title = new createjs.Text(plots[i].name, "24px serif", LIGHT_GREEN);
        title.x = point.x;
        title.y = point.y - 15;
        title.textAlign = "center";
        title.textBaseline = "bottom";
        clock.addChild(title);
        //#endregion
    }

    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
}

let handleTick = function () {
    //for (var i = 0; i < points.length; i++) {
    //    if (Math.abs(points[i].x - centerPos.x) >= 1 || Math.abs(points[i].y - centerPos.y) >= 1) {
    //        points[i].x -= 1 * Math.cos(points[i].radian);
    //        points[i].y -= 1 * Math.sin(points[i].radian);
    //    }
    //}
    //canvas.width = window.innerWidth;
}
//test
// ステージを作成
// リサイズイベントを検知してリサイズ処理を実行
window.addEventListener("resize", handleResize);
handleResize(); // 起動時にもリサイズしておく

// リサイズ処理
function handleResize(event) {
    // 画面幅・高さを取得
    let w = window.innerWidth;
    let h = window.innerHeight;
    // Canvas要素の大きさを画面幅・高さに合わせる
    let size = Math.min(w-100, h-100);

    stage.canvas.width = size;
    stage.canvas.height = size;
    stage.update();

    init();
}
