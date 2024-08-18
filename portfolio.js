


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

  let mediaStream = null;

  // Camera constraints
  var constraints = { 
    audio: false, 
    video: { 
      width: {ideal: 640}, 
      height: {ideal: 480},
      facingMode: "environment"
    } 
  };

  async function getMediaStream(constraints) {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      let video = document.getElementById('cam');    
      video.srcObject = mediaStream;
      video.onloadedmetadata = (event) => {
        video.play();
      };
    } catch (err) {
      console.error(err.message);   
      alert("Camera access was denied or not available.");
    }
  };

  async function switchCamera(cameraMode) {
    try {
      // Stop the current video stream
      if (mediaStream != null && mediaStream.active) {
        var tracks = mediaStream.getVideoTracks();
        tracks.forEach(track => track.stop());
      }
      
      // Set the video source to null
      document.getElementById('cam').srcObject = null;
      
      // Change "facingMode"
      constraints.video.facingMode = cameraMode;
      
      // Get new media stream
      await getMediaStream(constraints);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  }

  function takePicture() {
    let canvas = document.getElementById('canvas');
    let video = document.getElementById('cam');
    let photo = document.getElementById('photo');  
    let context = canvas.getContext('2d');

    const height = video.videoHeight;
    const width = video.videoWidth;

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearPhoto();
    }
  }

  function clearPhoto() {
    let canvas = document.getElementById('canvas');
    let photo = document.getElementById('photo');
    let context = canvas.getContext('2d');

    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  // Event listeners for buttons inside the modal
  document.getElementById('switchFrontBtn').onclick = (event) => {
    switchCamera("user");
  }

  document.getElementById('switchBackBtn').onclick = (event) => {
    switchCamera("environment");
  }

  document.getElementById('snapBtn').onclick = (event) => {
    takePicture();
    event.preventDefault();
  }

  // Clear photo placeholder
  clearPhoto();

  // Open the modal and activate the camera on camera icon click
  cameraIcon.addEventListener('click', () => {
    cameraModal.show();
    getMediaStream(constraints);
  });

  // Ensure the camera stream stops when the modal is closed
  document.getElementById('cameraModal').addEventListener('hidden.bs.modal', () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      document.getElementById('cam').srcObject = null;
    }
  });
});
