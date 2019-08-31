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
    let xspeed = Math.floor(Math.random()*5);
    let yspeed = Math.sqrt((25-(xspeed*xspeed)));
    let xcoordinate = boid.x;
    let ycoordinate= boid.y;

    app.ticker.add(() => {

        xcoordinate += xspeed;
        ycoordinate += yspeed;
        flightData[y/5].coordinates.pop();
        flightData[y/5].coordinates.pop();
        flightData[y/5].coordinates.push(xcoordinate, ycoordinate);
        boid.clear();
        boid.lineStyle(0, 0xff0000, 1);
        boid.beginFill(0xffFF00, 0.5);

        if (xcoordinate >= 1000 || xcoordinate < -200) {
            boid.moveTo(boid.x, 40);
            boid.lineTo(boid.x + 5, 50);
            boid.lineTo(boid.x - 5, 50);
            boid.closePath();
            xcoordinate = 0;
            boid.x = 0;
        }
        else if (ycoordinate >= 1000 || ycoordinate < -20) {
            boid.moveTo(boid.x, 40);
            boid.lineTo(boid.x + 5, 50);
            boid.lineTo(boid.x - 5, 50);
            boid.closePath();
            ycoordinate = 0;
            boid.y = 0;
        }
        else {
            boid.moveTo(boid.x + xcoordinate,ycoordinate+10);
            boid.lineTo(boid.x + xcoordinate + 5, ycoordinate);
            boid.lineTo(boid.x + xcoordinate - 5, ycoordinate);
            boid.closePath();
        }

    });


}
let flightData = {};
let boidList = [];
for (let i = 0; i < 800; i += 5) {
    renderBoids(Math.floor(Math.random()*600), i);
    boidList.push(i/5)
}

for(let i = 0; i < boidList.length; i++){
    flightData[i] = {
        "ID": boidList[i],
        "coordinates": coordinates
    };
    console.log(flightData[i])
}
              /*
setInterval(() => {
    console.log(flightData)
}, 10);
             */
console.log("end of first loop");