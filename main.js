

let points = [];
let pointsRes = [];

for (let i = 0; i < 500; i++) {
        let x = Math.floor(Math.random() * 400);
        let y = Math.floor(Math.random() * 400);
        points.push([x, y, 1]);
}

let w = [[-0.27429150322572426], [0.22462755492468917], [-7.533492472734972]]
for (let i = 0; i < 500; i ++) {
    pointsRes = reizina(points, w)
}

function reizina(a, b){
    let aNumRows = a.length;
    let aNumCols = a[0].length;
    let bNumRows = b.length;
    let bNumCols = b[0].length;
    res = new Array(aNumRows);
    for (let t = 0; t < aNumRows; t++){
        res[t] = new Array(bNumCols);
        for (let c = 0; c < bNumCols; c++){
            res[t][c] = 0;
            for (let i = 0; i < aNumCols; i++){
                res[t][c] += a[t][i]*b[i][c];
            }
        }
    }
    return res;
}

let context = document.getElementById("canv").getContext('2d');
let size = 10;
let radius = 0.5 * size;
for (let i = 0; i < 500; i++) {
    let x = points[i][0]
    let y = points[i][1]
    let pointX = Math.round(x - radius);
    let pointY = Math.round(y - radius);

    if (pointsRes[i] > 0) {
    context.fillStyle = 'red'
    } else {
    context.fillStyle = 'green'
    }

    context.fillRect(pointX, 400-pointY, size, size);
}
context.fill();

function f(x) {
    return x * 1.2 + 50
}

context.moveTo(0, 400-f(0));
context.lineTo(400, 400-f(400));
context.stroke();

function protons(iev) {
    let res = reizina(iev, w)
    if (res[0][0] >= 0) {
        return 1
    }
    return 0
}

w = [[Math.random()*20 - 10], [Math.random()*20 - 10], [Math.random()*20 - 10]]

var errList = []
var standNovir = 1

function trene() {
    let learnRate = 0.000002
    //for (let i = 0; i < 100; i++) {
    for (; standNovir > 0;) {
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < points.length; j++) {
                let ans = 0
                if (points[j][1] > f(points[j][0])) {
                    ans = 1
                }
                let err = ans - protons([points[j]])
                errList.push(err)
                if (err != 0) {
                    for (let k = 0; k < points[j].length; k++) {
                        w[k][0] += learnRate*err*points[j][k]
                    }
                }
            }
        }
        let vid = 0
        for (let i = 0; i < 100; i++) {
            vid += errList[i]
        }
        vid = vid/100
        let ss = 0
        for (let i = 0; i < 100; i++) {
            ss += (errList[i] - vid)*(errList[i] - vid)
        }
        standNovir = Math.sqrt(ss/100)
        errList = []
    }
}

trene()
let pointsResAi = []

    pointsResAi = reizina(points, w)

let cont = document.getElementById("canvRes").getContext('2d');
for (let i = 0; i < 500; i++) {
    let x = points[i][0]
    let y = points[i][1]
    let pointX = Math.round(x - radius);
    let pointY = Math.round(y - radius);

    if (pointsResAi[i] > 0) {
    cont.fillStyle = 'red'
    } else {
    cont.fillStyle = 'green'
    }

    cont.fillRect(pointX, 400-pointY, size, size);
}
cont.fill();

cont.moveTo(0, 400-f(0));
cont.lineTo(400, 400-f(400));
cont.stroke();
