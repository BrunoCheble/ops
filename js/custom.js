$('#send_message').click(function(){
  $('#demo-form').submit()
})

$('.project').click(function() {
  const details = $(this).find('.details_project').html()
  $('#infoProject .modal-body').html(details)
  $('#apply').data('subject','Apply for ' + $(this).find('.project-title').text())
  $('#infoProject').modal('show')
})

$('#apply').click(function() {
  $('#formModal .modal-title').hide()
  $('#formModal .modal-title#apply').show()
  $('#subject').val($(this).data('subject'))
  $('.modal').modal('hide')
  $('#formModal').modal('show')
})

$('.myOpportunities').click(function() {
  $('#formModal .modal-title').hide()
  $('#formModal .modal-title#default').show()
  $('#subject').val('Look for my opportunity')
  $('#formModal').modal('show')
})

$('.card-title').click(function(e) {
  $('.collapse.show').removeClass('show');
  
  $('#our-services').css('background-image','url('+$(this).data('image')+')')
  //$('#'+$(this).data('image')).show();
  //alert( $(this).data('image'));
})

$('#click-info-company').click(function() {
  $('#infoCompany').modal('show')
})


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