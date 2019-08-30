let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type);
const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = 800 / 2;
thing.y = 600 / 2;

let count = 0;


app.ticker.add(() => {
    count += 2;

    thing.clear();
    thing.lineStyle(0, 0xff0000, 1);
    thing.beginFill(0xffFF00, 0.5);

    thing.moveTo(count-400, 30);
    thing.lineTo(count-390, 50);
    thing.lineTo(count-410, 50);
    thing.closePath();
    if (count === 790) {
        count=0;
    }
});

console.log("loading complete");