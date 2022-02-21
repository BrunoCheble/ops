
const loadLanguage = (language) => {
  $.getJSON("./js/ie18/"+language+".json", (data) => {
    $('[data-ie18]').each((index,value) => {
      $(value).html(data[$(value).data('ie18')] ?? $(value).html())
    })
  });
}

$('[name="language"]').change(function(){
  const language = $(this).val()
  loadLanguage(language)
  $('#lang').text(language.substr(0,2).toUpperCase())
})

/*
function loadJSON() {

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './js/ie18/en_US.json', true);
  xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {

          // .open will NOT return a value but simply returns undefined in async mode so use a callback
          console.log(xobj.responseText);

      }
  }
  xobj.send(null);

}*/
