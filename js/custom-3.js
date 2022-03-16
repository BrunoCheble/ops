$('#who-we-are').click(function(e) {
  e.preventDefault()
  $('#whoweare').show()
  return true
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

$('.apply-vacancy').on('click', function(e) {
  e.preventDefault()
  const subject = $(this).parents('.vacancy-item').find('[data="subject"]').text()
  $('#subject').val(subject)
  $('#formModal').modal('show')
})

$('form#vacancy-form').submit(function(e) {
  e.preventDefault();
  var formData = new FormData(this);    

  $.ajax({
      url: './php/apply.php',
      type: 'POST',
      dataType: "json",
      data: formData,
      success: function (data) {
        if(data['status'] === 'error') {
          $('#response-form').addClass('alert-danger');
        }
        else {
          $('#response-form').addClass('alert-success');
          setTimeout(function() { location.reload(); }, 3000);
        }

        $('#response-form').text(data['msg']);
        $('#response-form').show();
      },
      cache: false,
      contentType: false,
      processData: false
  });
})