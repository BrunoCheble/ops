function loadTeam() {
  $.ajax({
    url: './js/team.json',
    dataType: "json",
    async: false,
    success: function(items) {
  
      const $sample = $('.sample-team')

      items.map(function(item) {
        const $newItem = $sample.clone()
        
        $newItem.find('[data="photo"]').attr('src', item.thumb)
        $newItem.find('[data="name"]').text(item.name)
        $newItem.find('[data="position"]').text(item.position)
        $newItem.removeClass('sample-team')
        
        $('#team-items').append($newItem.show())
      })
  
      $sample.remove()
    }
  })
}

function loadTechs() {
  $.ajax({
    url: './js/techs.json',
    dataType: "json",
    async: false,
    success: function(items) {
  
      const $sample = $('.sample-tech')

      items.map(function(item) {
        const $newItem = $sample.clone()
        
        $newItem.find('[data="photo"]').attr('src', item.image)
        $newItem.removeClass('sample-tech')
        
        $('#techs').append($newItem.show())
      })
  
      $sample.remove()
    }
  })
}

function loadProjects() {
  $.ajax({
    url: './js/projects.json',
    dataType: "json",
    async: false,
    success: function(items) {
  
      const $sample = $('.sample-project')

      items.map(function(item) {
        const $newItem = $sample.clone()
        
        $newItem.removeClass('sample-project')
        
        $newItem.find('[data="title"]').text(item.title)
        $newItem.find('[data="location"]').text(item.location)
        $newItem.find('[data="type"]').text(item.type)
        
        $newItem.find('[data="subject"]').text(item.title + ' - ' + item.location + ' - ' + item.type)

        $newItem.find('.list-icons').html(
          item.skills.map((skill) => '<li><i class="fas fa-check"></i> '+skill+'</li>').join('')
        )

        $('#projects').append($newItem.show())
      })
  
      $sample.remove()
    }
  })
}

loadTeam()
loadTechs()
loadProjects()