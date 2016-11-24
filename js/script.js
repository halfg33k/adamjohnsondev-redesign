// boxes containing each feature
var features = document.getElementsByClassName('work--features--feature');
// each project displayed
var projects = document.getElementsByClassName('work--portfolio--project');
// window dimensions
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
// before the fold
var bfold = document.getElementById('bfold');
// buttons to scroll the page
var btnScrollToTop = document.getElementById('backToTop');
var btnScrollToContact = document.getElementById('scrollToContact');
var btnScrollToContactSmall = document.getElementById('scrollToContactSmall');
// icons for each of the features
var featureIcons = [];
featureIcons.push(document.getElementById('feature_modern'));
featureIcons.push(document.getElementById('feature_custom'));
featureIcons.push(document.getElementById('feature_responsive'));
// elements of the icons
var paths = [];
var circles = [];
var rects = [];
// height of the page
var html = document.querySelector('html');
var htmlHeight = parseFloat(window.getComputedStyle(html).getPropertyValue('height'));

// set height of bfold to prevent resizing on phones when the address bar disappears
bfold.style.height = windowHeight + 'px';

// make these elements invisible when the page loads
// setting this here prevents the elements from disappearing if javascript is disabled
/*
for(var i = 0; i < features.length; i++){
    features[i].style.opacity = '0';
}
for(var i = 0; i < projects.length; i++){
    projects[i].getElementsByTagName('IMG')[0].style.opacity = '0';
}
*/

// resize bfold when the width changes (also covers orientation change)
function resizeBFold() {
    var newWidth = window.innerWidth;

    if(newWidth != windowWidth) {
        windowWidth = newWidth;
        windowHeight = window.innerHeight;

        bfold.style.height = windowHeight + 'px';
    }
} // resizeBFold

// keep the height of the feature boxes consistent
function resizeFeatures() {
    var maxHeight = 0; // max height
    var currHeight = 0; // current height

    // allow features to resize to fit contents
    for(var i = 0; i < features.length; i++){
        features[i].style.height = 'auto';
    }

    // find the greatest height
    for(var i = 0; i < features.length; i++){
        currHeight = features[i].offsetHeight;

        if(currHeight > maxHeight) {
            maxHeight = currHeight;
        }
    }

    // set each div to greatest height
    for(var i = 0; i < features.length; i++){
        features[i].style.height = maxHeight + 'px';
    }

    resizeBFold();
} // resizeFeatures

// prepare the feature icons for scroll animation
function prepareIconsForAnim(){
    var tempArray, temp;

    for(var i = 0; i < featureIcons.length; i++){
        // paths
        tempArray = featureIcons[i].getElementsByTagName('path');
        for(var j = 0; j < tempArray.length; j++){
            paths.push(tempArray[j]);
            temp = tempArray[j].getTotalLength(); // length of path
            tempArray[j].style.strokeDasharray = temp;
            //tempArray[j].style.strokeDashoffset = (i % 2 == 0) ? temp : -temp;
            tempArray[j].style.strokeDashoffset = -temp;
        }

        // circles
        tempArray = featureIcons[i].getElementsByTagName('circle');
        for(var j = 0; j < tempArray.length; j++){
            circles.push(tempArray[j]);
            temp = tempArray[j].getAttribute('r') * 2 * 3.14159265; // 2*pi*r
            tempArray[j].style.strokeDasharray = temp;
            tempArray[j].style.strokeDashoffset = (i % 2 == 0) ? temp : -temp;
        }

        // rectangles
        tempArray = featureIcons[i].getElementsByTagName('rect');
        for(var j = 0; j < tempArray.length; j++){
            rects.push(tempArray[j]);
            temp = (tempArray[j].getAttribute('width') * 2) + (tempArray[j].getAttribute('height') * 2);
            tempArray[j].style.strokeDasharray = temp;
            tempArray[j].style.strokeDashoffset = (i % 2 == 0) ? temp : -temp;
        }
    }



} // prepareIconsForAnim

// animate the feature icons on scroll
window.onscroll = function animateIcons(){
    // how far down have we scrolled
    var featureTop = features[0].getBoundingClientRect().top;
    var featureHeight = parseInt(features[0].style.height, 10);
    var percentageComplete = (((window.pageYOffset + (windowHeight / 8)) / (windowHeight)) * 100);
    // keep reasonable percentages
    percentageComplete = (percentageComplete < 0 ? 0 : percentageComplete);
    percentageComplete = (percentageComplete > 100 ? 100 : percentageComplete);
    var newUnit, dashOffset, offsetUnit, perim;

    // paths
    for(var i = 0; i < paths.length; i++){
        dashOffset = paths[i].getTotalLength();
        newUnit = parseInt(dashOffset, 10);
        offsetUnit = percentageComplete * (newUnit / 100);
        paths[i].style.strokeDashoffset = newUnit + offsetUnit;
    }

    // circles
    for(var i = 0; i < circles.length; i++){
        perim = circles[i].getAttribute('r') * 2 * 3.14159265;
        circles[i].style.strokeDashoffset = (i % 2 == 0) ? -perim + (perim * (percentageComplete / 100)) : perim - (perim * (percentageComplete / 100));
    }

    // rectangles
    for(var i = 0; i < rects.length; i++){
        perim = ((rects[i].getAttribute('width') * 2) + (rects[i].getAttribute('height') * 2));
        rects[i].style.strokeDashoffset = (i % 2 == 0) ? -perim + (perim * (percentageComplete / 100)) : perim - (perim * (percentageComplete / 100));
    }
} // animateIcons

// fade in effect on scroll to top button
function loadElements() {
    if(window.scrollTop != undefined && window.scrollTop > 10
        || window.pageYOffset != undefined && window.pageYOffset > 10) {
        btnScrollToTop.style.opacity = '0.75';
    } else {
        btnScrollToTop.style.opacity = '0';
    }
} // loadElements

// for smoothScrollTo
function animation(effectFrame, duration, from, to, easing, framespacing) {
    var start = Date.now(), change;

    if (animation.existing) {
        window.clearTimeout(animation.existing);
    }

    duration = duration || 1000;
    if (typeof from === 'function') {
        easing = from;
        from = 0;
    }
    easing = easing || function(x, t, b, c, d) { return c * t / d + b; };
    from = from || 0;
    to = to || 1;
    framespacing = framespacing || 1;
    change = to - from;

    (function interval() {
        var time = Date.now() - start;
        if (time < duration) {
            effectFrame(easing(0, time, from, change, duration));
            animation.existing = window.setTimeout(interval, framespacing);
        } else {
            effectFrame(to);
        }
    }());
} // animation

// smoothly scroll to the destination
function smoothScrollTo(target, duration) {
    var start = window.pageYOffset;        
    duration = duration || 1000;
    animation(function (position) { window.scroll(0,position); }, duration, start, target);
}; // smoothScrollTo

// add event listeners
window.addEventListener('resize', resizeFeatures);
window.addEventListener('scroll', loadElements);
btnScrollToTop.addEventListener('click', function(){smoothScrollTo(0,750)});
btnScrollToContact.addEventListener('click', function(){smoothScrollTo(document.documentElement.scrollHeight,750)});
btnScrollToContactSmall.addEventListener('click', function(){smoothScrollTo(document.documentElement.scrollHeight,750)});
resizeFeatures();
prepareIconsForAnim();
