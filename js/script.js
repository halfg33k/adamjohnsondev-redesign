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
    // set variables
    var maxHeight = 0;
    var temp = 0;

    // allow features to resize to fit contents
    for(var i = 0; i < features.length; i++){
        features[i].style.height = 'auto';
    }

    // find the greatest height
    for(var i = 0; i < features.length; i++){
        temp = features[i].offsetHeight;

        if(temp > maxHeight) {
            maxHeight = temp;
        }
    }

    // set each div to greatest height
    for(var i = 0; i < features.length; i++){
        features[i].style.height = maxHeight + 'px';
    }

    resizeBFold();
} // resizeFeatures

// fade in effect on scroll and scroll to top button
/*
function loadElements() {
    // fade in features
    for(var i = 0; i < features.length; i++) {
        var objectBottom = features[i].offsetTop + features[i].offsetHeight;
        if(window.scrollTop != undefined) {
            var windowBottom = window.scrollTop + (window.innerHeight / 3);
        } else {
            var windowBottom = window.pageYOffset + (window.innerHeight / 3);
        }

        if(windowBottom > objectBottom) {
            features[i].style.opacity = '1';
            features[i].style.transform = 'translateY(0)';
        } else {
            features[i].style.opacity = '0';
            features[i].style.transform = 'translateY(3em)';
        }
    }

    // fade in project images
    for(var i = 0; i < projects.length; i++) {
        var objectBottom = projects[i].offsetTop + projects[i].offsetHeight;
        if(window.scrollTop != undefined) {
            var windowBottom = window.scrollTop + (window.innerHeight / 3);
        } else {
            var windowBottom = window.pageYOffset - (window.innerHeight / 5);
        }

        if(windowBottom > objectBottom) {
            projects[i].getElementsByTagName('IMG')[0].style.opacity = '1';
            projects[i].getElementsByTagName('IMG')[0].style.transform = 'translateY(0)';
        } else {
            projects[i].getElementsByTagName('IMG')[0].style.opacity = '0';
            projects[i].getElementsByTagName('IMG')[0].style.transform = 'translateY(3em)';
        }
    }

    if(window.scrollTop != undefined && window.scrollTop > 10
        || window.pageYOffset != undefined && window.pageYOffset > 10) {
        btnScrollToTop.style.opacity = '0.75';
    } else {
        btnScrollToTop.style.opacity = '0';
    }
} // loadElements
*/

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
