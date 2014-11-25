jQuery(document).ready(function($) {
    // var viewportHeight = $(window).height();
    // alert(viewportHeight)
    checkBoxListener()
    // setNewsFeedHeight(getContentHeight)
});

$(window).resize(function() {
  // var viewportHeight = $(window).height();
    // alert(viewportHeight)
});

function checkBoxListener() {
  $("div.content").on("change", "input.toGraph", function(e){
    id = $(this).attr("id")
    if ($(this).is(":checked")) {
      update_selected(id, true)
    } else {
      update_selected(id, false)
    }
  });
}
function setNewsFeedHeight(h){
  $(".news-feed").height(h)
}
function getContentHeight(){
  return $(".container-fluid .row").height()
}
function update_selected(collaborator_id, is_selected){ 
  $.ajax({
    url: '/dashboard/update_selected',
    type: 'POST',
    data: {"collaborator_id": collaborator_id, "is_selected": is_selected},
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

function loadCharts(){
  $.ajax({
    url: '/dashboard/load_charts',
    type: 'GET',
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