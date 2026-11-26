
// THE MEMORY DEPARTMENT
// Subtle psychological horror interactions


// Remember the original browser tab title
const normalTitle = document.title;


// Change the tab title when the visitor leaves
document.addEventListener("visibilitychange", () => {

  if (document.hidden) {
    document.title = "Where did you go?";
  } else {
    document.title = normalTitle;
  }

});

// ==============================
// THE MEMORY DEPARTMENT
// INTERACTIVE PATIENT PORTAL
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  // Only run this code on patient.html
  const patientPage = document.querySelector(".patient-page");

  if (!patientPage) return;

  const selection = document.getElementById("selection");
  const restoration = document.getElementById("restoration-form");
  const deletion = document.getElementById("deletion-form");
  const confirmation = document.getElementById("confirmation");

  const hero = document.querySelector(".enrollment-hero");

const consultation = document.getElementById("consultation-form");

const panels = [
  selection,
  restoration,
  deletion,
  consultation,
  confirmation
].filter(Boolean);

  function showPanel(panel) {
    panels.forEach(item => {
      item.hidden = item !== panel;
    });

    hero.hidden = panel !== selection;

    // Scroll back to the top of the new screen
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Replay the dreamy reveal animation
    panel.classList.remove("panel-reveal");
    void panel.offsetWidth;
    panel.classList.add("panel-reveal");
  }

// SELECT A TREATMENT
// ==============================

document.querySelectorAll(".treatment-card").forEach(card => {

  card.addEventListener("click", () => {

    const treatment = card.dataset.treatment;

    if (treatment === "restoration") {
      showPanel(restoration);
    }

    if (treatment === "deletion") {
      showPanel(deletion);
    }

    if (treatment === "consultation" && consultation) {
      showPanel(consultation);
    }

  });

});

const patientParameters = new URLSearchParams(
  window.location.search
);

if (
  patientParameters.get("service") === "consultation"
  && consultation
) {
  showPanel(consultation);
}

  // ==============================
  // RETURN TO SELECTION
  // ==============================

  document.querySelectorAll(".form-back").forEach(button => {
    button.addEventListener("click", () => {
      showPanel(selection);
    });
  });


  // ==============================
  // RESTORATION: CERTAINTY SLIDER
  // ==============================

  const certaintySlider = document.getElementById("restore-certainty");
  const certaintyValue = document.getElementById("certainty-value");
  const restorationWhisper = document.getElementById("restoration-whisper");

  certaintySlider.addEventListener("input", () => {

    const value = Number(certaintySlider.value);

    certaintyValue.textContent = value + "%";

    if (value <= 20) {
      restorationWhisper.textContent =
        "Uncertainty is a normal part of the restoration process.";
    } else if (value >= 90) {
      restorationWhisper.textContent =
        "Certainty does not guarantee authenticity.";
    } else {
      restorationWhisper.textContent = "";
    }

  });


  // ==============================
  // DELETION: ASSOCIATED MEMORIES
  // ==============================

  const deletionWhisper = document.getElementById("deletion-whisper");

  document.querySelectorAll(
    'input[name="associated"]'
  ).forEach(input => {

    input.addEventListener("change", () => {

      if (input.value === "All") {
        deletionWhisper.textContent =
          "Please note: additional memories may be affected.";
      } else if (input.value === "Selected only") {
        deletionWhisper.textContent =
          "Isolation of a single memory cannot be guaranteed.";
      } else {
        deletionWhisper.textContent =
          "Some associated memories may be unavailable for review.";
      }

    });

  });

// ==============================
// SUBMIT CONSULTATION REQUEST
// ==============================

const consultationForm = document.getElementById(
  "consultation-application"
);

if (consultationForm) {

  consultationForm.addEventListener("submit", event => {

    event.preventDefault();

    const data = new FormData(consultationForm);

    const patientName = data.get("patientName");
    const preferredTime = data.get("preferredTime");

    const reference = "PC-" +
      Math.floor(100000 + Math.random() * 900000);

    const appointmentDate = new Date();

    appointmentDate.setDate(
      appointmentDate.getDate() + 7
    );

    const formattedDate = appointmentDate.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );

    let appointmentTime = "11:00 AM";

    if (preferredTime === "Morning") {
      appointmentTime = "10:30 AM";
    }

    if (preferredTime === "Afternoon") {
      appointmentTime = "2:00 PM";
    }

    const appointment = {
      name: patientName,
      treatment: "Private Consultation",
      date: formattedDate,
      time: appointmentTime,
      reference: reference
    };

    sessionStorage.setItem(
      "tmdAppointment",
      JSON.stringify(appointment)
    );

    window.location.href = "confirmation.html";

  });

}

  // ==============================
  // SUBMIT RESTORATION APPLICATION
  // ==============================

  const restorationForm = document.getElementById(
    "restoration-application"
  );

  restorationForm.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(restorationForm);
    const patientName = data.get("patientName");

    showConfirmation(
      patientName,
      "MR",
      "Your past is being reconstructed.",
      "Thank you for trusting us with what remains."
    );
  });


  // ==============================
  // SUBMIT DELETION APPLICATION
  // ==============================

  const deletionForm = document.getElementById(
    "deletion-application"
  );

  deletionForm.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(deletionForm);
    const patientName = data.get("patientName");

    showConfirmation(
      patientName,
      "MD",
      "Your request has been accepted. Please do not attempt to recall the selected memory.",
      "Some things are better left forgotten."
    );
  });


  // ==============================
  // CONFIRMATION SCREEN
  // ==============================

  
function showConfirmation(name, treatmentCode, message, secret) {

  const reference = treatmentCode + "-" +
    Math.floor(100000 + Math.random() * 900000);

  // Choose a fictional appointment 7 days from now.
  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + 7);

  const formattedDate = appointmentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const appointment = {
    name: name,
    treatment: treatmentCode === "MR"
      ? "Memory Restoration"
      : "Memory Remediation",
    date: formattedDate,
    time: treatmentCode === "MR" ? "10:30 AM" : "2:00 PM",
    reference: reference
  };

  // Store the fictional appointment only in this browser tab.
  sessionStorage.setItem(
    "tmdAppointment",
    JSON.stringify(appointment)
  );

  // Open the separate confirmation page.
  window.location.href = "confirmation.html";
}



  // ==============================
  // START OVER
  // ==============================

  document.getElementById("start-over").addEventListener("click", () => {

    restorationForm.reset();
    deletionForm.reset();

    certaintyValue.textContent = "50%";
    restorationWhisper.textContent = "";
    deletionWhisper.textContent = "";

    showPanel(selection);
  });

});

// ==============================
// PATIENT APPLICATION NOTIFICATIONS
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  const notification = document.getElementById(
    "patient-notification"
  );

  if (!notification) return;

  const title = document.getElementById("notification-title");
  const message = document.getElementById("notification-message");
  const icon = document.getElementById("notification-icon");
  const closeButton = document.getElementById("notification-close");

  let notificationTimer;

  function showNotification(type, heading, text) {

    clearTimeout(notificationTimer);

    notification.classList.remove("error", "success");
    notification.classList.add(type);

    title.textContent = heading;
    message.textContent = text;

    icon.textContent = type === "success" ? "✓" : "!";

    notification.hidden = false;

    notificationTimer = setTimeout(() => {
      notification.hidden = true;
    }, 5000);
  }

  closeButton.addEventListener("click", () => {
    clearTimeout(notificationTimer);
    notification.hidden = true;
  });

  const forms = [
    document.getElementById("restoration-application"),
    document.getElementById("deletion-application")
  ];

  forms.forEach(form => {

    if (!form) return;

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );

    // Check for incomplete answers when Submit is clicked
    submitButton.addEventListener("click", () => {

      if (!form.checkValidity()) {
        showNotification(
          "error",
          "Incomplete Application",
          "Please complete all required fields before submitting your request."
        );
      }

    });

    // Successful submissions
    form.addEventListener("submit", () => {

      showNotification(
        "success",
        "Application Submitted Successfully",
        "Your request has been received by The Memory Department."
      );

    });

  });

});

// ==============================
// DISPLAY FICTIONAL APPOINTMENT
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  const appointmentPage = document.querySelector(".appointment-page");

  if (!appointmentPage) return;

  const savedAppointment = sessionStorage.getItem("tmdAppointment");

  if (!savedAppointment) {
    document.getElementById("appointment-name").textContent =
      "NO APPOINTMENT FOUND";

    document.getElementById("appointment-treatment").textContent =
      "PLEASE COMPLETE AN APPLICATION";

    document.getElementById("appointment-date").textContent = "—";
    document.getElementById("appointment-time").textContent = "—";
    document.getElementById("appointment-reference").textContent = "—";

    document.querySelector(".appointment-status").textContent =
      "NO RESERVATION ON FILE";

    return;
  }

  const appointment = JSON.parse(savedAppointment);

  document.getElementById("appointment-name").textContent =
    appointment.name;

  document.getElementById("appointment-treatment").textContent =
    appointment.treatment;

  document.getElementById("appointment-date").textContent =
    appointment.date;

  document.getElementById("appointment-time").textContent =
    appointment.time;

  document.getElementById("appointment-reference").textContent =
    appointment.reference;

});

// ==============================
// SERVICES: CONFIDENTIAL ADVISORIES
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".service-advisory").forEach(advisory => {

    const button = advisory.querySelector(".advisory-button");
    const reveal = advisory.querySelector(".advisory-reveal");

    if (!button || !reveal) return;

    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {

      const isOpening = reveal.hidden;

      reveal.hidden = !isOpening;

      button.setAttribute(
        "aria-expanded",
        String(isOpening)
      );

      button.textContent = isOpening
        ? "CLOSE CONFIDENTIAL ADVISORY −"
        : "READ CONFIDENTIAL ADVISORY +";

    });

  });

});


/* ========================================
   UNAUTHORIZED PATIENT PORTAL WARNING
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("system-warning-overlay");
  const warning = overlay?.querySelector(".system-warning");
  const dismiss = document.getElementById("warning-dismiss");

  if (!overlay || !warning || !dismiss) return;

  const forms = [
    document.getElementById("restoration-application"),
    document.getElementById("deletion-application")
  ].filter(Boolean);

  let warningShown = false;
  let previousFocus = null;
  const interactedFields = new Set();

  function showWarning() {
    if (warningShown) return;

    warningShown = true;
    previousFocus = document.activeElement;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      document.body.classList.add("system-warning-flicker");
    }

    overlay.hidden = false;
    document.body.classList.add("system-warning-active");

    warning.focus();

    if (!reducedMotion) {
  const flash = document.body;

  flash.addEventListener(
    "animationend",
    event => {
      if (event.animationName === "system-flash") {
        flash.classList.remove("system-warning-flicker");
      }
    },
    { once: true }
  );
}
  }
  function closeWarning() {
    overlay.hidden = true;
    document.body.classList.remove("system-warning-active");
    document.body.classList.remove("system-warning-flicker");

    if (previousFocus?.isConnected) {
      previousFocus.focus();
    }

    const notification = document.getElementById(
      "patient-notification"
    );

    const title = document.getElementById("notification-title");
    const message = document.getElementById("notification-message");
    const icon = document.getElementById("notification-icon");

    if (notification && title && message) {
      title.textContent = "SYSTEM INTEGRITY RESTORED";
      message.textContent =
        "An unauthorized communication has been removed for your protection.";

      if (icon) icon.textContent = "✳";

notification.classList.remove("error");
notification.classList.add("success");
notification.hidden = false;

setTimeout(() => {
  notification.hidden = true;
}, 5000);
    }
  }

  forms.forEach(form => {
    form.addEventListener("change", event => {
      const field = event.target;

      if (!field.matches("input, textarea, select")) return;

      interactedFields.add(field);

      if (interactedFields.size >= 3) {
        showWarning();
      }
    });

    form.addEventListener("focusout", event => {
      const field = event.target;

      if (!field.matches("input, textarea, select")) return;
      if (!field.value.trim()) return;

      interactedFields.add(field);

      if (interactedFields.size >= 3) {
        showWarning();
      }
    });
  });

  dismiss.addEventListener("click", closeWarning);

  overlay.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeWarning();
    }

    if (event.key === "Tab") {
      const focusable = [
        overlay.querySelector(".warning-leave"),
        dismiss
      ];

      const first = focusable[0];
      const last = focusable[1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  });
});


/* ========================================
   RESIDENTIAL STAY INTERACTIVE ITINERARY
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  const buttons = Array.from(
    document.querySelectorAll(".stay-day-button")
  );

  const panels = Array.from(
    document.querySelectorAll(".stay-day-panel")
  );

  if (!buttons.length || !panels.length) return;

  function selectDay(selectedButton) {

    const selectedDay = selectedButton.dataset.day;

    buttons.forEach(button => {
      const isActive = button === selectedButton;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach(panel => {
      const isActive =
        panel.id === "stay-panel-" + selectedDay;

      panel.hidden = !isActive;
      panel.classList.toggle("active", isActive);
    });

  }

  buttons.forEach((button, index) => {

    button.addEventListener("click", () => {
      selectDay(button);
    });

    button.addEventListener("keydown", event => {

      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % buttons.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex =
          (index - 1 + buttons.length) % buttons.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = buttons.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      selectDay(buttons[nextIndex]);
      buttons[nextIndex].focus();

    });

  });

});


/* ========================================
   FICTIONAL PARTNER ADVERTISEMENTS
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  const ad = document.getElementById("memory-ad");
  const closeButton = document.getElementById("memory-ad-close");

  if (!ad || !closeButton) return;

  const advertisements = [
    {
      image: "images/memory-perfume2.jpg",
      alt: "Remember Me perfume",
      category: "AN EXCLUSIVE COLLECTION",
      title: "REMEMBER ME™",
      subtitle: "The Fragrance of Yesterday",
      description: "Some things are too beautiful to forget.",
      fineprint: "",
      link: "services.html#remember-me"
    },
    {
      image: "images/memory-vacation.jpg",
      alt: "The Reorientation Club retreat",
      category: "POST-TREATMENT EXPERIENCES",
      title: "THE REORIENTATION CLUB",
      subtitle: "Your New Beginning Awaits",
      description: "There's so much to look forward to. Again.",
      fineprint: "",
      link: "services.html#reorientation-club"
    }
  ];

  const photo = document.getElementById("memory-ad-photo");
  const category = document.getElementById("memory-ad-category");
  const title = document.getElementById("memory-ad-title");
  const subtitle = document.getElementById("memory-ad-subtitle");
  const description = document.getElementById("memory-ad-description");
  const fineprint = document.getElementById("memory-ad-fineprint");
  const dots = ad.querySelectorAll(".memory-ad-dot");
  const cta = ad.querySelector(".memory-ad-cta");

  let currentAd = 0;
  let switchTimer;

  function showAdvertisement(index) {

    currentAd = index;

    const item = advertisements[index];

    photo.src = item.image;
    photo.alt = item.alt;
    category.textContent = item.category;
    title.textContent = item.title;
    subtitle.textContent = item.subtitle;
    description.textContent = item.description;
    fineprint.textContent = item.fineprint;

    if (cta) {
      cta.href = item.link;
    }

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
      dot.setAttribute("aria-pressed", String(dotIndex === index));
    });

  }

  // Allow visitors to switch advertisements manually

  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      clearTimeout(switchTimer);
      showAdvertisement(index);

    });

  });

  // Show the first advertisement after one second

  const appearTimer = setTimeout(() => {

    showAdvertisement(0);
    ad.hidden = false;

    // Automatically show the second ad after 30 seconds

    switchTimer = setTimeout(() => {
      showAdvertisement(1);
    }, 30000);

  }, 1000);

  // Close advertisement

  closeButton.addEventListener("click", () => {

    ad.hidden = true;

    clearTimeout(appearTimer);
    clearTimeout(switchTimer);

    sessionStorage.setItem("memoryAdsDismissed", "true");

  });

});


/* ========================================
   ABOUT US — REORIENTATION CLUB AD
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  const vacationAd = document.getElementById("vacation-ad");
  const closeButton = document.getElementById("vacation-ad-close");

  // Only runs on pages containing the vacation ad
  if (!vacationAd || !closeButton) return;

  // Show advertisement after 5 seconds
  const vacationTimer = setTimeout(() => {
    vacationAd.hidden = false;
  }, 5000);

  // Allow visitors to close the advertisement
  closeButton.addEventListener("click", () => {
    vacationAd.hidden = true;
    clearTimeout(vacationTimer);
  });

});

/* ========================================
   SERVICES PAGE — DREAMLESS ADVERTISEMENT
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  const dreamlessAd = document.getElementById("dreamless-ad");
  const closeButton = document.getElementById("dreamless-ad-close");

  // Only runs on the Services page
  if (!dreamlessAd || !closeButton) return;

  // Show DREAMLESS after 5 seconds
  const dreamlessTimer = setTimeout(() => {
    dreamlessAd.hidden = false;
  }, 5000);

  // Close advertisement when X is clicked
  closeButton.addEventListener("click", () => {
    dreamlessAd.hidden = true;
    clearTimeout(dreamlessTimer);
  });

});
