$('#who-we-are').click(function(e) {
  e.preventDefault()
  $('#whoweare').show()
  return true
})

$(document).ready(function() {

  if(!$('#our-company').is(':visible')) {
    $('#link-our-company').attr('href','#whoweare');
    $('#link-our-company').attr('data-hash-offset','50')
  }

})

$('.toogle-vacancy').click(function(){
  const content = $(this).parents('.vacancy-item').find('.vacancy-content')
  const deg = !content.is(':visible') ? 180 : 0
  const color = !content.is(':visible') ? '#121c4d' : '#666'

  content.slideToggle()

  $(this).find('.icon-toogle').animate(
    { deg },
    {
      duration: 600,
      step: function(now) {
        $(this).css({ transform: 'rotate(' + now + 'deg)', color });
      }
    }
  )
})

$('.nav-link').click(function(e) {
  e.preventDefault()
  $('.hamburguer-btn.hamburguer-btn-sticky-dark.active').removeClass('active')
  //$('#header.side-header-hide').removeClass('side-header-hide')
})

function reloadReCaptcha() {
  grecaptcha.execute('6LfgYOceAAAAAMf6OXVViznq_F3B0Rz9vSzVTRwL', {action: 'submit'}).then(function(token) {
    document.getElementById('token_generate').value = token
  });
}

$('#look-vacancy').on('click', function(e) {
  e.preventDefault()
  $('#subject').val('Encontrar projeto ideal para mim')

  $('form#vacancy-form [type="submit"]').attr('disabled',false)
  $('#response-form').hide()
  $('#formModal').modal('show')
  reloadReCaptcha();
})

$('.apply-vacancy').on('click', function(e) {
  e.preventDefault()
  const subject = $(this).parents('.vacancy-item').find('[data="subject"]').text()
  $('#subject').val(subject)
  $('form#vacancy-form [type="submit"]').attr('disabled',false)
  $('#response-form').hide()
  $('#formModal').modal('show')
  reloadReCaptcha();
})

$('form#vacancy-form').submit(function(e) {
  e.preventDefault();
  
  $('form#vacancy-form [type="submit"]').attr('disabled',true);

  var formData = new FormData(this);    

  $.ajax({
      url: './php/apply.php',
      type: 'POST',
      dataType: "json",
      data: formData,
      success: function (data) {
  
        if(data['status'] === 'error') {
          reloadReCaptcha();
          $('#response-form').addClass('alert-danger');
          $('form#vacancy-form [type="submit"]').attr('disabled',false)
        }
        else {
          $('#response-form').addClass('alert-success');
          setTimeout(function() { $('#formModal').modal('hide') }, 3000);
        }

        $('#response-form').text(data['msg']);
        $('#response-form').show();
      },
      cache: false,
      contentType: false,
      processData: false
  });
})

$('#open-nearshore').click(function(){
  $('#nearshoreModal').modal('show')
})
