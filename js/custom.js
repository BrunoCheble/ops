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
  $('#images-service *').hide();
  $('#'+$(this).data('image')).show();
  //alert( $(this).data('image'));
})

$('#click-info-company').click(function() {
  $('#infoCompany').modal('show')
})