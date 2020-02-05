var base_url = "https://cms.integreat-app.de";

$( document ).ready(function() {  
    $.getJSON( base_url + "/wp-json/extensions/v3/sites", function( data ) {
        var options = "";
        $.each( data, function( key, site ) {
            options = options.concat( "<option value='" + site.path + "'>" + site.name + "</option>" );
        });
        $('#location').html(options);
    });
});

$('#location').on('change', function() {
    $.getJSON( base_url + this.value +"de/wp-json/extensions/v3/languages", function( data ) {
		var options = "<option value='0'>Choose</option>";
          $.each( data, function( key, language ) {
            console.log(language.code);
            options = options.concat( "<option value='" + language.code + "'>" + language.code + "</option>" );
        });
        $('#language').html(options);

    });
});

$('#language').on('change', function() {
    $.getJSON( base_url + $("#location").val() + this.value +"/wp-json/extensions/v3/pages", function( data ) {
      var output = "";
      $.each( data, function( key, page ) {
        output = output.concat("<p>Checking " + page.url);
        try { 
          var a = decodeURI(page.url); 
        } catch(e) {
          output = output.concat("Found error:");
          output = output.concat(e); 
        }
        output = output.concat("</p>")
      });
      $('#output').html(output);
    });
});
