let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}
PIXI.utils.sayHello(type);
const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

function renderBoids(x, y) {
    const boid = new PIXI.Graphics();
    app.stage.addChild(boid);
    boid.x = x;
    boid.y = y;
    let xspeed = 5;
    //let yspeed = Math.floor(Math.random()*6);
    let xcount = boid.x;
    app.ticker.add(() => {

        xcount += xspeed;

        boid.clear();
        boid.lineStyle(0, 0xff0000, 1);
        boid.beginFill(0xffFF00, 0.5);

        if (xcount >= 795) {
            boid.moveTo(boid.x, 40);
            boid.lineTo(boid.x + 5, 50);
            boid.lineTo(boid.x - 5, 50);
            boid.closePath();
            xcount = 0;
            boid.x = 0;
        }
        else {
            boid.moveTo(boid.x + xcount, 40);
            boid.lineTo(boid.x + xcount + 5, 50);
            boid.lineTo(boid.x + xcount - 5, 50);
            boid.closePath();
        }

    });
}

for (let i = 0; i < 800; i += 50) {
    renderBoids(Math.floor(Math.random()*600), i)
}
console.log("loading complete");