// clear canvas
// save canvas state
// draw animated shapes
// restore canvas state

//arc method: arc(x,y,radius,startAngle,endAngle,counterClockwise=false)

FREQ_MS = 2;
var canvas = $('#canvas')[0];
var context = canvas.getContext('2d');
var colors = ["blue","red","green","orange"];
var balls = [];
var gravity = .9
var radius = 20;

function Ball(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = 1;
    this.speedY = 1;
    this.x_interval = 1;
    this.y_interval = 1;
}

// Ball.prototype.draw = function(context){
//     context.fillStyle = this.color;
//     context.beginPath();
//     context.arc(this.x,this.y,15,0,Math.PI*2,true);
//     context.closePath();
//     context.fill();
// }

Ball.prototype = {
    constructor: Ball,
    draw : function(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.radius,rGen(360),Math.PI*2,true);
        context.closePath();
        context.fill();
    },
    reverseDirection : function(direction) {
        if (direction == 'x'){
            this.x_interval = -this.x_interval;
        }
        else if (direction == 'y')
        {
            this.y_interval = -this.y_interval;
        }
    }
}

function rGen(range){
    return Math.ceil(Math.random()*range);
}



function collisionDetect(balls){
    var A = balls[0];
    var B = balls[1];
    var Dx = Math.abs(A.x - B.x);
    var Dy = Math.abs(A.y - B.y);
    var Distance = Math.sqrt(Math.pow(Dx,2)+Math.pow(Dy,2));
    if (Distance <= 2*radius){
        A.reverseDirection('x');
        A.reverseDirection('y');
        B.reverseDirection('x');
        B.reverseDirection('y');
        //console.log("Distance: "+ Distance);
    }  




}


function step(){
    context.clearRect(0,0,canvas.width,canvas.height);


    for (var i=0;i<balls.length;i++){

        var b = balls[i];
        b.x+=b.x_interval * gravity;
        b.y+=b.y_interval;
        b.draw(context);
        
        //BOUNDARY CONDITIONS
        if(b.x > canvas.width - b.radius){
            b.reverseDirection('x');
        }
        
        if(b.x < 0 + b.radius){
            b.x_interval = -b.x_interval;
        }
        
        if(b.y > canvas.height - b.radius){
            b.y_interval = -b.y_interval;
        }
        
        if(b.y < 0 + b.radius){
            b.y_interval = -b.y_interval;
        }

       // for each ball, if that ball's x,y area coincides with any other ball
        collisionDetect(balls);


    }

}

function init(numberOfBalls){
    for (var i=0;i<numberOfBalls;i++)
    {
        var rand_x = rGen(canvas.width);
        var rand_y = rGen(canvas.height);
        var ball = new Ball(rand_x,rand_y,radius,colors[i]);
        balls.push(ball);
    }
}

$(document).ready( function(){
    init(2);
    setInterval(step,FREQ_MS);
});
