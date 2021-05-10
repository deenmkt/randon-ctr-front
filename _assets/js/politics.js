
(function ($, window, document) {
  'use strict';
  $(function () {
    $("#politics .system__container .accordion .list .item").on('click', function () {
      $("#politics .system__container .accordion .list .item").removeClass("active");
      $(this).addClass("active");
    });
  });
}(window.jQuery, window, document));