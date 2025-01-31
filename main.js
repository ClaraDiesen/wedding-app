const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;

    // Apply parallax effects with mobile conditions
    if (parallax) {
        parallax.style.backgroundPositionX = offset * (-0.3) - 50 + "px";
    }
    
    if (parallax1) {
        if (!isMobile) {
            // Desktop version
            parallax1.style.backgroundPositionY = (offset - 3100) * 0.1 + "px";
        } else {
            // Mobile version - adjust these values based on your needs
            parallax1.style.backgroundPositionY = (offset - 1500) * 0.05 + "px";
        }
    }
/*   
    if (parallax2) {
        if (!isMobile) {
            // Desktop version
            parallax2.style.backgroundPositionY = (offset - 4800) * (-0.1) + "px";
        } else {
            // Mobile version - adjust these values based on your needs
            parallax2.style.backgroundPositionY = (offset - 2400) * (-0.05) + "px";
        }
    }
*/ 
    // Call reveal function
    reveal();
});

// Form handling elements
const rsvpFormContainer = document.getElementById("rsvp-form-container");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpCloseBtn = document.getElementById("rsvp-close-btn");
const rsvpBtn = document.querySelector(".home .huge-btn");
const rsvpButtonBottom = document.getElementById('rsvp-btn-bottom');

const blessingFormContainer = document.getElementById("blessing-form-container");
const blessingForm = document.getElementById("blessing-form");
const blessingCloseBtn = document.getElementById("blessing-close-btn");
const blessingBtn = document.querySelector("#registry .huge-btn");

// Show forms on button click
if (rsvpBtn) {
  rsvpBtn.addEventListener("click", function () {
    rsvpFormContainer.style.display = "block";
  });
}

if (rsvpButtonBottom) {
  rsvpButtonBottom.addEventListener("click", function () {
    rsvpFormContainer.style.display = "block";
  });
}

if (blessingBtn) {
  blessingBtn.addEventListener("click", function () {
    blessingFormContainer.style.display = "block";
  });
}

// Close forms on button click
if (rsvpCloseBtn) {
  rsvpCloseBtn.addEventListener("click", function () {
    rsvpFormContainer.style.display = "none";
  });
}

if (blessingCloseBtn) {
  blessingCloseBtn.addEventListener("click", function () {
    blessingFormContainer.style.display = "none";
  });
}


window.addEventListener("resize", function() {
  const offset = window.pageYOffset;
  const isMobile = window.innerWidth <= 768;
  
  if (parallax1 && isMobile) {
      parallax1.style.backgroundPositionY = (offset - 1500) * 0.05 + "px";
  }
  
  if (parallax2 && isMobile) {
      parallax2.style.backgroundPositionY = (offset - 2400) * (-0.05) + "px";
  }
});

window.addEventListener("click", function (event) {
  if (event.target === rsvpFormContainer) {
    rsvpFormContainer.style.display = "none";
  }
  if (event.target === blessingFormContainer) {
    blessingFormContainer.style.display = "none";
  }
});

document.getElementById('rsvp-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var formData = new FormData(event.target);
  console.log('Form Data:');
  for (const [key, value] of formData.entries()) {
    console.log(key + ':', value);
  }

  const attendance = document.getElementById('rsvp-attendance').value;
  const isAttending = attendance === 'present';
  //console.log(attendance)
  //console.log(isAttending)
    
  if(isAttending){
    emailjs.sendForm('service_m82gprb', 'template_s6g0fxj', formData)
      .then(function(response) {
          console.log('SUCCESS!', response);
      }, function(error) {
          console.log('FAILED...', error);
      }); 
  }else{
    emailjs.sendForm('service_m82gprb', 'template_wxmior3', formData) //TODO other
      .then(function(response) {
          console.log('SUCCESS!', response);
      }, function(error) {
          console.log('FAILED...', error);
      }); 
  }

/**/
  
});

if (rsvpForm) {
  rsvpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    /**/

    const attendance = document.getElementById('rsvp-attendance').value;
    const isAttending = attendance === 'present';
    console.log(attendance)
    console.log(isAttending)

    if(isAttending){
      emailjs.sendForm('service_m82gprb', 'template_s6g0fxj', rsvpForm) //TODO other
        .then(function (response) {
          alert('Zu- oder Absage erfolgreich gesendet!');
          rsvpFormContainer.style.display = "none";
          rsvpForm.reset();
        }, function (error) {
          alert('Beim Versenden deiner Zu- oder Absage ist ein Fehler aufgetreten. Bitte versuch es noch einmal.');
          console.error('Erreur:', error);
        });
      }else{  
        emailjs.sendForm('service_m82gprb', 'template_wxmior3', rsvpForm) //TODO other
        .then(function (response) {
          alert('Zu- oder Absage erfolgreich gesendet!');
          rsvpFormContainer.style.display = "none";
          rsvpForm.reset();
        }, function (error) {
          alert('Beim Versenden deiner Zu- oder Absage ist ein Fehler aufgetreten. Bitte versuch es noch einmal.');
          console.error('Erreur:', error);
        });

      }



  });
}

document.addEventListener("DOMContentLoaded", function () {
  const guestCountInput = document.getElementById("rsvp-guests");
  const guestNamesContainer = document.getElementById("guest-names-container");

  guestCountInput.addEventListener("input", function () {
      // Clear previous fields
      guestNamesContainer.innerHTML = "";

      let guestCount = parseInt(guestCountInput.value);
      if (isNaN(guestCount) || guestCount < 1 || guestCount > 6) return;

      for (let i = 2; i <= guestCount; i++) {
          let guestDiv = document.createElement("div");
          guestDiv.classList.add("form-group");

          guestDiv.innerHTML = `
              <label>Name des ${i}. Gasts:</label>
              <input type="text" name="guest-${i}-first-name" required>
          `;

          guestNamesContainer.appendChild(guestDiv);
      }
  });
});

// EmailJS
if (blessingForm) {
  blessingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    /*
    emailjs.sendForm('service_m82gprb', 'template_x3whjd8', blessingForm)
      .then(function (response) {
        alert('Bénédiction envoyée avec succès !');
        blessingFormContainer.style.display = "none";
        blessingForm.reset();
      }, function (error) {
        alert('Une erreur s\'est produite lors de l\'envoi de votre bénédiction. Veuillez réessayer.');
        console.error('Erreur:', error);
      });*/
  });
}


function myFunction() {
  document.getElementById("check").checked = false;
}


function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  var windowHeight = window.innerHeight;

  for (var i = 0; i < reveals.length; i++) {
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
