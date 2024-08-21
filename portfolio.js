


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




// function toggle_div_fun(id) {
//   var divelement = document.getElementById(id);
//   if (divelement.style.display === 'none') {
//       divelement.style.display = 'block';
//   } else {
//       divelement.style.display = 'none';
//   }
// }


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

$(document).ready(function () {
  const cameraIcon = $('#camera-icon');
  const cameraModalEl = $('#cameraModal');
  const body = $('body');
  let scrollPosition = 0;

  // Initialize the modal
  const cameraModal = new bootstrap.Modal(cameraModalEl[0]);

  let mediaStream = null;

  // Camera constraints
  var constraints = { 
    audio: false, 
    video: { 
      width: { ideal: 640 }, 
      height: { ideal: 480 },
      facingMode: "environment"
    } 
  };

  async function getMediaStream(constraints) {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      let video = $('#cam')[0];
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
        video.play();
      };
    } catch (err) {
      console.error(err.message);   
      alert("Camera access was denied or not available.");
    }
  }

  async function switchCamera(cameraMode) {
    try {
      if (mediaStream) {
        let tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());
      }

      $('#cam').attr('srcObject', null);
      constraints.video.facingMode = cameraMode;
      await getMediaStream(constraints);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  }

  function takePicture() {
    let canvas = $('#canvas')[0];
    let video = $('#cam')[0];
    let photo = $('#photo');
    let context = canvas.getContext('2d');

    const height = video.videoHeight;
    const width = video.videoWidth;

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      let data = canvas.toDataURL('image/png');
      photo.attr('src', data);

      // Hide other buttons and video
      $('#switchFrontBtn, #switchBackBtn,#snapBtn, #cam').hide();

      // Show Thank U message
      $('.thank-you-message').show();
    } else {
      clearPhoto();
    }
  }

  function clearPhoto() {
    let canvas = $('#canvas')[0];
    let photo = $('#photo');
    let context = canvas.getContext('2d');

    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
    let data = canvas.toDataURL('image/png');
    photo.attr('src', data);
  }

  clearPhoto();

  cameraIcon.on('click', function () {
    scrollPosition = window.pageYOffset;
    body.css({
      position: 'fixed',
      top: `-${scrollPosition}px`,
      width: '100%',
    });
    body.addClass('no-scroll');  
    cameraModal.show();
    getMediaStream(constraints);
  });

  $('#switchFrontBtn').on('click', function () {
    switchCamera("user");
  });

  $('#switchBackBtn').on('click', function () {
    switchCamera("environment");
  });

  $('#snapBtn').on('click', function (event) {
    takePicture();
    event.preventDefault();
  });

  cameraModalEl.on('hidden.bs.modal', function () {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      $('#cam').attr('srcObject', null);
    }
    body.removeClass('no-scroll');  
    body.css({
      position: '',
      top: '',
      width: '',
    });
    window.scrollTo(0, scrollPosition);

    // Reset visibility of buttons and video when modal closes
    $('#switchFrontBtn, #switchBackBtn, #cam').show();
    $('.thank-you-message').hide();
  });
});
