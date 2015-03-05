// clear canvas
// save canvas state
// draw animated shapes
// restore canvas state

var ball  = {
    'top' : 15,
    'left' : 15,
}

// use window.requestAnimationFrame() soon
function draw(left, top){
    var state = 'on';
    var grav = .3;
    var t_interval = l_interval =1;
    var fill = "rgba(200,100,24,0.2)";
    var FREQ_MS = 5;

    setInterval(function(){
        var canvas = $('canvas')[0];
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.arc(left,top,15,-1,Math.PI*2,true);
        top+=t_interval;
        left+=l_interval*grav;
        if (top > 285){
            t_interval = -t_interval;
            fill = "rgba(100,100,24,0.2)";
        }
        if (top < 15){
            t_interval = -t_interval;
            fill = "blue";
        }
        if (left > 285){
            l_interval = -l_interval;
            fill = "red";
        }
        if (left < 15){
            l_interval = -l_interval;
            fill = "blue";
        }
        //left,top, diameter, ?, ?
        ctx.closePath();
        ctx.fill();

    },FREQ_MS);

}

$(document).ready(function(){
 

    draw(15,15);
});
