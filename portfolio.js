


//--===============-====================-======================-=======================


// Add this script to portfolio.js

document.addEventListener('DOMContentLoaded', () => {
    const showContentBtn = document.getElementById('showContentBtn');
    const body = document.body;

    showContentBtn.addEventListener('click', () => {
        body.classList.remove('hidden');
        body.classList.add('show');
        showContentBtn.style.display = 'none';
    });
});

$(document).ready(function () {
    let isScrolling = false;
    const sections = $("section");
    const numSections = sections.length;
    let currentSection = 0;
    const scrollDuration = 10; // Duration for smooth scrolling

    function scrollToSection(index) {
        $("html, body").stop().animate({
            scrollTop: $(sections[index]).offset().top
        }, scrollDuration, 'swing');
    }

    $(window).on('wheel', function (e) {
        if (isScrolling) return;

        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, scrollDuration); // Match the duration of the animation

        if (e.originalEvent.deltaY > 0) { // Scrolling down
            if (currentSection < numSections - 1) {
                currentSection++;
            }
        } else { // Scrolling up
            if (currentSection > 0) {
                currentSection--;
            }
        }

        scrollToSection(currentSection);
    });

    // Ensure the initial scroll position is correct
    $(window).on('load', function () {
        scrollToSection(currentSection);
    });
});




function toggle_div_fun(id) {
    var divelement = document.getElementById(id);
    if (divelement.style.display == 'none')
        divelement.style.display = 'block';
    else
        divelement.style.display = 'none';
}


$(document).ready(function () {
    $("#toggle-button").click(function () {
        // Hide the card__content div
        $(".card__content").fadeOut();

        // Show the images
        $(".img-styl").fadeIn();
    });
});


$(function () {
    $("#img1").draggable({});
    $("#img2").draggable({});
    $("#img3").draggable({});
    $("#img4").draggable({});
    $("#img5").draggable({});
    $("#img6").draggable({});
    $("#img7").draggable({});
    $("#img8").draggable({});
    $("#img9").draggable({});
    $("#img10").draggable({});
    $("#img11").draggable({});
    $("#img12").draggable({});
    $("#img13").draggable({});
    $("#img14").draggable({});
    $("#img15").draggable({});
    $("#img16").draggable({});
    $("#img17").draggable({});
    $("#img18").draggable({});
});



$(function () {
    function shuffleImages() {
        $(".img-styl").each(function () {
            var containerWidth = $(".container-fuid").width();
            var containerHeight = $(".container-fuid").height();
            var imageWidth = $(this).width();
            var imageHeight = $(this).height();

            // Calculate random position within container bounds
            var left = Math.random() * (containerWidth - imageWidth);
            var top = Math.random() * (containerHeight - imageHeight);

            // Animate position change (set to 100ms for faster movement)
            $(this).animate({ left: left + 'px', top: top + 'px' }, 100);
        });
    }

    // Toggle button functionality
    $("#toggle-button").click(function () {
        shuffleImages();
    });

});


// ========================================================================
// document.getElementById('camera-icon').addEventListener('click', function () {
//     // Access the camera using getUserMedia API
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then(function (stream) {
//                 // Display the video stream in the video element
//                 const video = document.getElementById('videoElement');
//                 video.style.display = 'block'; // Show the video element
//                 video.srcObject = stream;
//             })
//             .catch(function (err) {
//                 console.error("An error occurred: " + err);
//                 alert("Camera access was denied or not available.");
//             });
//     } else {
//         alert("getUserMedia is not supported in this browser.");
//     }
// });

// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const openButton = document.getElementById('open');
  const cameraIcon = document.getElementById('camera-icon');
  const cameraModal = new bootstrap.Modal(document.getElementById('cameraModal'));
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  let stream;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('getUserMedia is not supported in this browser.');
      return;
  }

  async function openCam() {
      try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          video.play();
      } catch (error) {
          alert(`Camera access was denied or is not available. ${error.message}`);
      }
  }

  function closeCam() {
      if (stream) {
          stream.getTracks().forEach(track => track.stop());
          video.srcObject = null;
      }
  }

  if (openButton) {
      openButton.addEventListener('click', () => {
          openCam();
          document.getElementById('control').style.display = 'block';
      });
  } else {
      console.error('Element with ID "open" not found.');
  }

  document.getElementById('close').addEventListener('click', () => {
      closeCam();
      cameraModal.hide();
  });

  document.getElementById('snap').addEventListener('click', () => {
      if (video.srcObject) {
          canvas.width = video.clientWidth;
          canvas.height = video.clientHeight;
          context.drawImage(video, 0, 0);
          document.getElementById('vid').style.zIndex = '20';
          document.getElementById('capture').style.zIndex = '30';
      } else {
          alert('No video stream available to capture.');
      }
  });

  document.getElementById('retake').addEventListener('click', () => {
      document.getElementById('vid').style.zIndex = '30';
      document.getElementById('capture').style.zIndex = '20';
  });

  cameraIcon.addEventListener('click', () => {
      cameraModal.show();
  });
});
