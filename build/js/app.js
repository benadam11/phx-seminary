//Initialize Foundation
$(document).foundation();

//Initialize Bing Conversion
var uetq = uetq || [];

//Scroll to Anchor Tags
$('a[href*=\\#]:not([href=\\#])').click(function() {
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
    location.hostname == this.hostname
  ) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

    if (target.length) {
      $('html,body').animate({ scrollTop: target.offset().top + -10 }, 1000);
      return false;
    }
  }
});

//Form
var name, email, phone, radioVal, educationLevel, programChoice, startDate;

function getValues() {
  name = $('#name-field', '#submit-form').val();
  email = $('#email-field', '#submit-form').val();
  phone = $('#phone-field', '#submit-form').val();
  radioVal = $('input[name=radio]:checked', '#submit-form').val();
  educationLevel = $('#education-field option:selected').val();
  programChoice = $('#program-field option:selected').val();
  startDate = $('#start-field option:selected').val();
}

$('#submit-form').on('valid', function(e) {
  e.preventDefault();
  getResponse();
});

function resetForm() {
  $('#submit-form')[0].reset();
}

//Form Ajax Request
function getResponse() {
  getValues();

  $.ajax({
    type: 'POST',
    url: '',
    data: {
      api_user: '',
      api_key: '',
      from: '',
      to: '',
      cc: '',
      subject: 'New World Changers',
      html: '<p>Student Name: ' +
        name +
        '<br>' +
        'Email: ' +
        email +
        '<br>' +
        'Phone: ' +
        phone +
        '<br>' +
        'Undergraduate Degree: ' +
        radioVal +
        '<br>' +
        'Program Choice: ' +
        programChoice +
        '<br>' +
        'Start Preference: ' +
        startDate +
        '</p>'
      //   }
    },
    beforeSend: function() {
      $('#submit-button')
        .addClass('sending')
        .html('<i class="fa fa-circle-o-notch fa-spin"></i> Sending');
    },
    error: function(data) {
      $('#submit-button')
        .removeClass('sending')
        .addClass('sent')
        .html('<i class="fa fa-check"></i> Sent')
        .prop('disabled', true);
        // .addClass('error')
        // .html('<i class="fa fa-times"></i> Try again.');
        // $('.response-container').html('Looks like something went wrong. Click the reset button and try again.');
      //Add Success Message
      $('.response-container').html(
        'Thank you! We will contact you shortly with some more information about our programs.'
      );
      //GA
      ga('send', 'event', 'lead', 'lp');
      //bing
      var uetq = uetq || [];
      uetq.push({ ec: 'lead', ea: 'submit' });

      // $('#submit-button').on('click', function(e){
      //    e.preventDefault();
      //   resetForm();
      //   $('#submit-button').removeClass('error');
      //  });
    },

    success: function() {
      //Send GA Converstion
      // ga('send', 'event', 'lead', 'lp');

      //Update Button
      $('#submit-button')
        .removeClass('sending')
        .addClass('sent')
        .html('<i class="fa fa-check"></i> Sent')
        .prop('disabled', true);
      //Add Success Message
      $('.response-container').html(
        'Thank you! We will contact you shortly with some more information about our programs.'
      );
    }
  });
}
