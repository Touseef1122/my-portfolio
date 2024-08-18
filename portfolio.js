


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



document.addEventListener('DOMContentLoaded', () => {
    const cameraIcon = document.getElementById('camera-icon');
    const cameraModal = new bootstrap.Modal(document.getElementById('cameraModal'));
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let stream;
  
    function openCam() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          video.srcObject = stream;
          video.play();
        })
        .catch(e => alert(`Error: ${e.message}`));
    }
  
    function closeCam() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
    }
  
    document.getElementById('open').addEventListener('click', () => {
      openCam();
      document.getElementById('control').style.display = 'block';
    });
  
    document.getElementById('close').addEventListener('click', () => {
      closeCam();
      cameraModal.hide();
    });
  
    document.getElementById('snap').addEventListener('click', () => {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
      context.drawImage(video, 0, 0);
      document.getElementById('vid').style.zIndex = '20';
      document.getElementById('capture').style.zIndex = '30';
    });
  
    document.getElementById('retake').addEventListener('click', () => {
      document.getElementById('vid').style.zIndex = '30';
      document.getElementById('capture').style.zIndex = '20';
    });
  
    cameraIcon.addEventListener('click', () => {
      cameraModal.show();
    });
  });
  
    