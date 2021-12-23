// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
}

// Hamburger menu
document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
        $('body').toggleClass('no-scroll');

      });
    });
  }

});

// Newsletter Form Submit
$('#newsletter-form').on('submit', function (e) {
  var formId = '#' + $(this).attr('id');;

  submitForm(formId, e);
});

function submitForm(formId, e) {
  e.preventDefault();

  // validate
  var error = false;
  $(formId + ' [name]').each(function (index, input) {
    if ($(input).val() === '') {
      error = true;
      $(input).addClass('is-validation-error');
    }
  });

  if (error) {
    return false;
  }

  let email = $(formId).find('input[name="email"]').val();
  // ajax submit form
  $.post('https://connect.radarrelay.com/api/v1/subscribe', {
    utm_source: "weth",
    email
  }, function (res) {
    $(formId).addClass('is-submitted');
    ga('send', 'event', 'newsletter-form', 'submit', 'Newsletter Signup');
  }).fail(function (e) {
    console.log(e);
    alert('Sorry, the server is unreachable.');
  });
};

// remove error class on focus
$('[name="name"],[name="email"],[name="message"]').on('focus', function () {
  $(this).removeClass('is-validation-error');
});

// localization local__dropdown
var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function (event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});
