// var timerinterval = false;
// $(document).ready(function() {
//
// });
//
//
//
//
//  function doOnOrientationChange() {
//     var viewportmeta = document.querySelector('meta[name="viewport"]');
//     switch(window.orientation)
//     {
//       case -90:
//       case 90:
//         setTimeout(function(){
//              var actual_width = 1920;
//             var actual_height = window.innerHeight;
//
//             var min_width = 1920;
//             var min_height = 1080;
//
//             var ratio = Math.min(actual_width / min_width, actual_height / min_height);
//
//             if (ratio < 1) {
//                 //document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + actual_width);
//                 viewportmeta.setAttribute('content', 'width='+min_width+', initial-scale='+ratio+'');
//             }
//         },700);
//         break;
//       default:
//         viewportmeta.setAttribute('content', 'width=width=device-width, initial-scale=1.0');
//         break;
//     }
// }
//
// // Only bind the event on iPhone and iPad so we do not try and do this on any other device.
// if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i)) {
//     window.addEventListener('orientationchange', doOnOrientationChange);
//     // Initial execution if needed
//     doOnOrientationChange();
// }
//
//
// /*
//
//  $(window).load(function() {
//     if($(window).width() > 767) {
//
//     } else {
//        // Find matches
// 		var mql = window.matchMedia("(orientation: portrait)");
// 		// If there are matches, we're in portrait
// 		if(mql.matches) {
// 			// Portrait orientation
// 			document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+'width=device-width'+', initial-scale='+1.0+'');
//
// 		} else {
// 			// Landscape orientation
// 			 var siteWidth = 1920;
// 			var scale = screen.width /siteWidth
// 			document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
// 		}
//
//         $('.head-block-div h3 em').html(screen.width);
// 		// Add a media query change listener
// 		mql.addListener(function(m) {
// 			if(m.matches) {
// 				document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+'width=device-width'+', initial-scale='+1.0+'');
// 			}
// 			else {
// 				 var siteWidth = 1920;
// 			var scale = screen.width /siteWidth
// 			document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
// 			}
// 		});
//
//     }
// });
//      */
//
//
//
// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     timerinterval = setInterval(function () {
//         minutes = parseInt(timer / 60, 10)
//         seconds = parseInt(timer % 60, 10);
//
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;
//
//         display.html ( "Timer <br />"+minutes + ":" + seconds );
//
//         if (--timer < 0) {
//             clearInterval(timerinterval)
//             timerinterval=false;
//         }
//     }, 1000);
// }
//
// window.onload = function () {
//     var totalMin = 2;
//     var totalSec = 60 * totalMin;
//     var countMinutes = 60 * totalMin,
//         display = $('.timer-div > .count');
//         $('.borderanim').addClass('active');
//     startTimer(countMinutes, display);
//
//
//
//     var path = document.querySelector('.borderanim path#motionPath');
//
//     var animateMotion = document.querySelector('.borderanim animateMotion');
//     animateMotion.setAttribute('dur', totalSec+"s");
//
//     var strokedur = document.querySelector('.borderanim #strokeanim');
//     strokedur.setAttribute('dur', totalSec+"s");
//
//     var cirlcedur = document.querySelector('.borderanim #circleanim');
//     cirlcedur.setAttribute('dur', totalSec+"s");
//
//
//     var length = path.getTotalLength();
//     // Clear any previous transition
//     path.style.transition = path.style.WebkitTransition =
//       'none';
//     // Set up the starting positions
//     //path.style.strokeDasharray = length + ' ' + length;
//     //path.style.strokeDashoffset = length;
//     // Trigger a layout so styles are calculated & the browser
//     // picks up the starting position before animating
//     //path.getBoundingClientRect();
//     // Define our transition
//
//     //path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset '+totalSec+'s linear';
//     // Go!
//     //path.style.strokeDashoffset = '0';
//
//
// };
