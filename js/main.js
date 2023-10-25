(function ($) {
    "use strict";

    // Preloader (if the #preloader div exists)
    $(window).on('load', function () {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function () {
                $(this).remove();
            });
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Header scroll class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Smooth scroll for the navigation and links with .scrollto classes
    $('.main-nav a, .mobile-nav a, .scrollto').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();

                    if (!$('#header').hasClass('header-scrolled')) {
                        top_space = top_space - 40;
                    }
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.main-nav, .mobile-nav').length) {
                    $('.main-nav .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.main-nav, .mobile-nav');
    var main_nav_height = $('#header').outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        nav_sections.each(function () {
            var top = $(this).offset().top - main_nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                main_nav.find('li').removeClass('active');
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
        });
    });
})(jQuery);



// Side navbar
const SideNavButton = document.querySelector(".SideBar");
const SideNav = document.querySelector("#Main_SideNav");

SideNavButton.addEventListener("click", () => {
    console.log("Hello nav");
    if (SideNav.classList.contains("PosShow")) {
        SideNav.classList.remove("PosShow");
        SideNav.classList.add("Poshide");
    } else if (SideNav.classList.contains("Poshide")) {
        SideNav.classList.remove("Poshide");
        SideNav.classList.add("PosShow");
    }
})



// Add Animation background...............

const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d');

let scale = 1, // device pixel ratio
    width,
    height;

let stars = [];

let pointerX,
    pointerY;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

function generate() {

    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: 0,
            y: 0,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
        });
    }

}

function placeStar(star) {

    star.x = Math.random() * width;
    star.y = Math.random() * height;

}

function recycleStar(star) {

    let direction = 'z';

    let vx = Math.abs(velocity.x),
        vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
        let axis;

        if (vx > vy) {
            axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        }
        else {
            axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }

        if (axis === 'h') {
            direction = velocity.x > 0 ? 'l' : 'r';
        }
        else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    }
    else if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    }
    else if (direction === 'r') {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    }
    else if (direction === 't') {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
    }
    else if (direction === 'b') {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
    }

}

function resize() {

    scale = window.devicePixelRatio || 1;

    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    stars.forEach(placeStar);

}

function step() {

    context.clearRect(0, 0, width, height);

    update();
    render();

    requestAnimationFrame(step);

}

function update() {

    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    stars.forEach((star) => {

        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        // recycle when out of bounds
        if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
            recycleStar(star);
        }

    });

}

function render() {

    stars.forEach((star) => {

        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;

        context.beginPath();
        context.moveTo(star.x, star.y);

        var tailX = velocity.x * 2,
            tailY = velocity.y * 2;

        // stroke() wont work on an invisible line
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);

        context.stroke();

    });

}

function movePointer(x, y) {

    if (typeof pointerX === 'number' && typeof pointerY === 'number') {

        let ox = x - pointerX,
            oy = y - pointerY;

        velocity.tx = velocity.tx + (ox / 8 * scale) * (touchInput ? 1 : -1);
        velocity.ty = velocity.ty + (oy / 8 * scale) * (touchInput ? 1 : -1);

    }

    pointerX = x;
    pointerY = y;

}

function onMouseMove(event) {

    touchInput = false;

    movePointer(event.clientX, event.clientY);

}

function onTouchMove(event) {

    touchInput = true;

    movePointer(event.touches[0].clientX, event.touches[0].clientY, true);

    event.preventDefault();

}

function onMouseLeave() {

    pointerX = null;
    pointerY = null;

}


// Add products filter...........................................................................
filterSelection("all");
function filterSelection(c) {
    var x, i;
    x = document.querySelectorAll(".filterElements");
    if (c == "all") c = "";
    Array.from(x).forEach(item => {
        removeActiveClass(item, "show");
        if (item.className.indexOf(c) > -1) addActiveClass(item, "show");
    });
}
function addActiveClass(ele, name) {
    var i, arr1, arr2;
    arr1 = ele.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            ele.className += " " + arr2[i];
        }
    }
}
function removeActiveClass(ele, name) {
    var i, arr1, arr2;
    arr1 = ele.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    ele.className = arr1.join(" ");
}
var filterBtns = document.querySelector(".filterBtns");
var btns = filterBtns.getElementsByTagName("button");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("activivation");
        current[0].className = current[0].className.replace(" activivation", "");
        this.className += " activivation";
    });
}

