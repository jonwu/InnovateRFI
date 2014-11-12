jQuery(document).ready(function($) {
    clickListenerOutsidePanel()
});

/**
 * Click listener that is not response-panel
 * @return {void} 
 */
function clickListenerOutsidePanel(){
    $(document).mouseup(function (e)
    {
        var container = $(".response-panel");

        if (!container.is(e.target) // if the target of the click isn't the container...
              && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            collapseContent()
        }
    });
}


function collapseContent(){
  $.ajax({
    url: '/responses/collapse_content',
    type: 'POST',
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
/**
 * Initialize textarea
 * @return {void} 
 */
function initTextArea(){
  $.fn.wysihtml5.defaultOptions['toolbar']['image']
  $.fn.wysihtml5.defaultOptions
  $('.response-textarea').wysihtml5();       
}