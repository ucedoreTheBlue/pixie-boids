let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}
PIXI.utils.sayHello(type);
const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

coordinates = [];
function renderBoids(x, y) {
    const boid = new PIXI.Graphics();
    app.stage.addChild(boid);
    boid.x = x;
    boid.y = y;
    let xspeed = 2;
    let yspeed = 0;
    let xcount = boid.x;
    let ycount= boid.y;

    app.ticker.add(() => {

        xcount += xspeed;
        ycount += yspeed;
        flightData[y/25].coordinates.pop();
        flightData[y/25].coordinates.pop();
        flightData[y/25].coordinates.push(xcount, ycount);
        boid.clear();
        boid.lineStyle(0, 0xff0000, 1);
        boid.beginFill(0xffFF00, 0.5);

        if (xcount >= 800) {
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
let flightData = {};
let boidList = [];
for (let i = 0; i < 800; i += 25) {
    renderBoids(Math.floor(Math.random()*600), i);
    boidList.push(i/25)
}

for(let i = 0; i < boidList.length; i++){
    flightData[i] = {
        "ID": boidList[i],
        "coordinates": coordinates
    };
    console.log(flightData[i])
}

console.log("loading complete");