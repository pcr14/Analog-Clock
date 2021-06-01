var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var radius = canvas.height / 2;
context.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(context, radius);
  drawNumbers(context, radius);
  drawTime(context, radius);

}

function drawFace(context, radius) {
  var grad;
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fillStyle = 'white';
  context.fill();
  grad = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  context.strokeStyle = grad;
  context.lineWidth = radius * 0.1;
  context.stroke();
  context.beginPath();
  context.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  context.fillStyle = '#333';
  context.fill();
}

function drawNumbers(context, radius) {
  var ang;
  var num;
  context.font = radius * 0.15 + "px arial";
  context.textBaseline = "middle";
  context.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    context.rotate(ang);
    context.translate(0, -radius * 0.85);
    context.rotate(-ang);
    context.fillText(num.toString(), 0, 0);
    context.rotate(ang);
    context.translate(0, radius * 0.85);
    context.rotate(-ang);
  }
}

function drawTime(context, radius) {
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();

  hour = hour % 12;
  hour = (hour * Math.PI / 6) +
    (min * Math.PI / (6 * 60)) +
    (sec * Math.PI / (360 * 60));
  drawHand(context, hour, radius * 0.5, radius * 0.07);

  min = (min * Math.PI / 30) + (sec * Math.PI / (30 * 60));
  drawHand(context, min, radius * 0.8, radius * 0.07);

  sec = (sec * Math.PI / 30);
  drawHand(context, sec, radius * 0.9, radius * 0.02);
}


function drawHand(context, posn, len, width) {
  context.beginPath();
  context.lineWidth = width;
  context.lineCap = "round";
  context.moveTo(0, 0);
  context.rotate(posn);
  context.lineTo(0, -len);
  context.stroke();
  context.rotate(-posn);
}
