$(document).ready(function () {
  var n,
    i = $(".sticky"),
    s = "sticky-pin",
    t = i.offset().top;
  function o() {
    (n = i.innerHeight()),
      i.css({ "margin-bottom": "-" + n + "px" }),
      i.next().css({ "padding-top": +n + "px" });
  }
  function c() {
    $(this).scrollTop() >= t ? i.addClass(s) : i.removeClass(s);
  }
  i.after('<div class="jumps-prevent"></div>'),
    $(window).resize(function () {
      o();
    }),
    c(),
    $(window).scroll(function () {
      c();
    });
});
