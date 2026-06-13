$(document).ready(function() {
  // 1. Owl Carousel Initialization
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    smartSpeed: 800,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });

  // 2. Sticky Navbar Scroll Effect
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      $('.navbar').addClass('navbar-scrolled');
    } else {
      $('.navbar').removeClass('navbar-scrolled');
    }
    trackActiveSection();
  });

  // 3. Smooth scroll for navigation links
  $('a.nav-link[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = this.hash;
    if (target) {
      $('html, body').stop().animate({
        scrollTop: $(target).offset().top - 80
      }, 600);
      
      // Update active link immediately
      $('.nav-link').removeClass('active');
      $(this).addClass('active');
    }
  });

  // 4. Form Submission and Validation Handling
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        // Show success toast
        showToast();
        // Reset form and validation state
        form.reset();
        form.classList.remove('was-validated');
      } else {
        form.classList.add('was-validated');
      }
    }, false);
  }

  // Toast display logic
  function showToast() {
    const toast = document.getElementById('successToast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  // 5. Scrollspy: Track active section in viewport
  function trackActiveSection() {
    const scrollPos = $(window).scrollTop() + 150;
    $('section').each(function() {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr('id');

      if (scrollPos >= top && scrollPos <= bottom) {
        $('.navbar-nav .nav-link').removeClass('active');
        $(`.navbar-nav .nav-link[href="#${id}"]`).addClass('active');
      }
    });
  }
});

// 6. Global Helper function to scroll to contact section and focus
function scrollToContact(eventName) {
  $('html, body').stop().animate({
    scrollTop: $('#contact').offset().top - 80
  }, 600, function() {
    // Focus Name field
    const nameInput = $('#validationCustom01');
    nameInput.focus();
    
    // Add pulsing effect to indicate where to type
    nameInput.addClass('animate__animated animate__pulse');
    setTimeout(() => {
      nameInput.removeClass('animate__animated animate__pulse');
    }, 1000);
  });
}