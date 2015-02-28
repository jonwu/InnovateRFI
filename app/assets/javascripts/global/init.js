$(document).ready(function() {
  initBestInPlace()
  initPjax()
  toggleActive()
});

function initBestInPlace(){
  jQuery(".best_in_place").best_in_place();
}

/**
 * Initializes Pjax behavior in sidebars containers.
 */
function initPjax() {
  // both types of attributes go to main-content container
  $(document).pjax('a[question-pjax]', '.main-content-pjax')
  $(document).pjax('a.question-pjax', '.main-content-pjax')
  $(document).pjax('a.category-pjax', '.questions-pjax')
}

function toggleActive(){
  $('#questions').on('click', ".list-group-item", function(event) {
    $('#questions .active').removeClass('active');
    $(this).addClass('active');
  });
}

