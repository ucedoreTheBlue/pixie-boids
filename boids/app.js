let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}
PIXI.utils.sayHello(type);
const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

let flightData = {};
let coordinates = [];
let direction = [];
let distances = [];

function renderBoids(x, y, c) {
    const boid = new PIXI.Graphics();
    app.stage.addChild(boid);
    boid.x = x;
    boid.y = y;
    let xspeed = Math.random();
    let yspeed = Math.sqrt((25 - (xspeed * xspeed)));
    let xcoordinate = boid.x;
    let ycoordinate = boid.y;

    app.ticker.add(() => {

        xcoordinate += xspeed;
        ycoordinate += yspeed;
        flightData[y/5].coordinates.splice(0, 2);
        flightData[y/5].coordinates.push(xcoordinate, ycoordinate);
        flightData[y/5].direction.pop();
        flightData[y/5].direction.pop();
        flightData[y/5].direction.push(xspeed, yspeed);
        for (let i = 0; i < 160; i++) {
            if (distances.length >= 160){
                distances.pop()
            }
            distances.push(Math.sqrt( Math.pow((xcoordinate - xcoordinate*i*5), 2) +Math.pow((ycoordinate - ycoordinate*i*5), 2)));
        }
        boid.clear();
        boid.lineStyle(0, c, 1);
        boid.beginFill(0xffFF00, 0.5);
        if (xcoordinate >= 1000 || xcoordinate < -200) {
            boid.moveTo(boid.x, 40);
            boid.lineTo(boid.x + 5, 50);
            boid.lineTo(boid.x - 5, 50);
            boid.closePath();
            xcoordinate = 0;
            boid.x = 0;
        } else if (ycoordinate >= 1000 || ycoordinate < 0) {
            boid.moveTo(boid.x, 40);
            boid.lineTo(boid.x + 5, 50);
            boid.lineTo(boid.x - 5, 50);
            boid.closePath();
            ycoordinate = 0;
            boid.y = -300;
        } else {
            boid.moveTo(boid.x + xcoordinate, ycoordinate + 10);
            boid.lineTo(boid.x + xcoordinate + 5, ycoordinate);
            boid.lineTo(boid.x + xcoordinate - 5, ycoordinate);
            boid.closePath();
        }
        boid.rotation = xspeed
    })
}

let boidList = [];
for (let i = 0; i < 800; i += 5) {
    renderBoids(Math.floor(Math.random() * 600), i, 0xffFF00);
    boidList.push(i / 5)
}

for (let i = 0; i < boidList.length; i++) {

    flightData[i] = {
        "ID": boidList[i],
        "coordinates": coordinates,
        "direction": direction,
        "distances": distances
    };
}


setTimeout(() => {
    for (let i = 0; i < boidList.length; i++) {
        console.log(flightData[i]);
    }
}, 500);

console.log("end of first loop");