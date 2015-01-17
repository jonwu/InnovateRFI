jQuery(document).ready(function($) {
    clickListenerOutsidePanel()
});

/**
 * Click listener that is not response-panel
 * @return {void} 
 */
function clickListenerOutsidePanel(){
    $('#wrapper').click(function(e) {
        var container = $(".panel-content");
        if (!container.is(e.target) // if the target of the click isn't the container...
              && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            text = $(".response-textarea").val()
            save_content(text)
        }
    });
}


function save_content(text){
  $.ajax({
    url: '/responses/save_response',
    type: 'POST',
    data: {"text": text},
  })
  .done(function() {
    // console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
}