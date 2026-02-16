var buttonActive = document.querySelector('.button button')
buttonActive.onclick = function(){
    var boxFlower = document.querySelector('.flower-img:nth-child(1)')
    var boxFlower2 = document.querySelector('.flower-img:nth-child(2)')
    var boxFlower3 = document.querySelector('.flower-img:nth-child(3)')
    var boxFlower4 = document.querySelector('.flower-img:nth-child(4)')
    var boxFlower5 = document.querySelector('.flower-img:nth-child(5)')
    var boxFlower6 = document.querySelector('.flower-img:nth-child(6)')
    var circleActive = document.querySelector('.circle')
    var boxsliderimg1 = document.querySelector('.box-slider_img1')
    var catActive = document.querySelector('.cat')
    var numberActive = document.querySelector('.box-number')
    var buttonDisplay = document.querySelector('.box-button')
    var rhombus1 = document.querySelector('.rhombus:nth-child(1)')
    var rhombus2 = document.querySelector('.rhombus:nth-child(2)')
    var rhombusImg = document.querySelector('.rhombus-img')
    var mailActive = document.querySelector('.mail')

    boxFlower.classList.toggle("active")
    boxFlower2.classList.toggle("active")
    boxFlower3.classList.toggle("active")
    boxFlower4.classList.toggle("active")
    boxFlower5.classList.toggle("active")
    boxFlower6.classList.toggle("active")
    circleActive.classList.toggle("active")
    boxsliderimg1.classList.toggle("active")
    catActive.classList.toggle("active")
    numberActive.classList.toggle("active")
    buttonDisplay.classList.toggle("active")
    rhombus1.classList.toggle("active")
    rhombus2.classList.toggle("active")
    rhombusImg.classList.toggle("active")
    mailActive.classList.toggle("active")
}

var mail = document.querySelector(".mail")
var slider3 = document.querySelector(".slider3")
var closeSlider3 = document.querySelector(".fa-xmark")
mail.onclick = function(){
    slider3.classList.add("active")
}

// Tự động mở thiệp sau X giây
var buttonActive = document.querySelector('.button button')
buttonActive.addEventListener('click', function(){
    setTimeout(function(){
        slider3.classList.add("active")
    }, 2000) // 2000ms = 2 giây, chỉnh tùy ý
})
closeSlider3.addEventListener('click', function(){
    slider3.classList.remove('active')
})


var introArea = document.querySelector(".box-slider");
var mySong = document.getElementById("song");

// ===== SPLASH SCREEN =====
var splash = document.getElementById("splash-screen");
var canvas = document.getElementById("fireworks-canvas");
var ctx = canvas.getContext("2d");

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Hoa rơi
var petalColors = ["#FF6B8A","#FF8FAB","#FFB3C6","#FFC8A2","#FFD700","#FF4D6D","#FFCCD5"];
function createPetals() {
    var count = 18;
    for (var i = 0; i < count; i++) {
        var petal = document.createElement("div");
        petal.classList.add("splash-petal");
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.width = (10 + Math.random() * 10) + "px";
        petal.style.height = (10 + Math.random() * 10) + "px";
        petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.style.animationDuration = (4 + Math.random() * 5) + "s";
        petal.style.animationDelay = (Math.random() * 6) + "s";
        petal.style.borderRadius = Math.random() > 0.5 ? "50% 0 50% 0" : "0 50% 0 50%";
        splash.appendChild(petal);
    }
}
createPetals();

// Pháo hoa
var fireworks = [];
var particles = [];

function randomColor() {
    var colors = ["#FFD700","#FF6B6B","#FF8C00","#00FFFF","#FF69B4","#ADFF2F","#FF4500","#FFF"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function launchFirework() {
    fireworks.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        tx: 100 + Math.random() * (canvas.width - 200),
        ty: 80 + Math.random() * (canvas.height * 0.45),
        speed: 8 + Math.random() * 6,
        color: randomColor(),
        trail: []
    });
}

function explodeFirework(fw) {
    var count = 60 + Math.floor(Math.random() * 40);
    for (var i = 0; i < count; i++) {
        var angle = (Math.PI * 2 / count) * i;
        var speed = 2 + Math.random() * 4;
        particles.push({
            x: fw.x, y: fw.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: fw.color,
            alpha: 1,
            size: 2 + Math.random() * 2,
            gravity: 0.07
        });
    }
}

function animateFireworks() {
    if (!splash.classList.contains("hide")) {
        requestAnimationFrame(animateFireworks);
    }
    ctx.fillStyle = "rgba(26,0,0,0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update fireworks
    for (var i = fireworks.length - 1; i >= 0; i--) {
        var fw = fireworks[i];
        var dx = fw.tx - fw.x;
        var dy = fw.ty - fw.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        fw.trail.push({x: fw.x, y: fw.y});
        if (fw.trail.length > 12) fw.trail.shift();

        // Draw trail
        for (var t = 0; t < fw.trail.length; t++) {
            ctx.beginPath();
            ctx.arc(fw.trail[t].x, fw.trail[t].y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = fw.color;
            ctx.globalAlpha = t / fw.trail.length * 0.6;
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (dist < fw.speed) {
            explodeFirework(fw);
            fireworks.splice(i, 1);
        } else {
            fw.x += (dx / dist) * fw.speed;
            fw.y += (dy / dist) * fw.speed;
        }
    }

    // Update particles
    for (var j = particles.length - 1; j >= 0; j--) {
        var p = particles[j];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.97;
        p.alpha -= 0.013;

        if (p.alpha <= 0) { particles.splice(j, 1); continue; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// Launch fireworks every 1.2s
var fireworkInterval = setInterval(function() {
    if (splash.classList.contains("hide")) {
        clearInterval(fireworkInterval);
        return;
    }
    launchFirework();
    setTimeout(launchFirework, 400);
}, 1200);

// Kick off first ones immediately
launchFirework();
setTimeout(launchFirework, 300);
setTimeout(launchFirework, 600);

animateFireworks();

// Click splash to enter
splash.addEventListener("click", function() {
    splash.classList.add("hide");
    mySong.play().catch(e => console.log(e));
});
// ===== END SPLASH SCREEN =====