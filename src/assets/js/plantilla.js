(()=> {

    $(function() {
        "use strict";
        //start main-header
        $("#global-loader").fadeOut("slow");
        window.matchMedia("(min-width: 992px)").matches && ($(".main-navbar .active").removeClass("show"), $(".main-header-menu .active").removeClass("show")),
            $(".main-header .dropdown > a").on("click", function (e) {
                e.preventDefault(), $(this).parent().toggleClass("show"), $(this).parent().siblings().removeClass("show"), $(this).find(".drop-flag").removeClass("show");
            })
        $(window).on("scroll", function (e) {
            $(window).scrollTop() >= 66 ? $("main-header").addClass("fixed-header") : $(".main-header").removeClass("fixed-header");
        });

        $(".dropdown-menu .main-header-arrow").on("click", function (e) {
            e.preventDefault(), $(this).closest(".dropdown").removeClass("show");
        });

        $(document).on("click touchstart", function (e) {
            (e.stopPropagation(), $(e.target).closest(".main-header .dropdown").length || $(".main-header .dropdown").removeClass("show"), window.matchMedia("(min-width: 992px)").matches)
                ? ($(e.target).closest(".main-navbar .nav-item").length || $(".main-navbar .show").removeClass("show"),
                  $(e.target).closest(".main-header-menu .nav-item").length || $(".main-header-menu .show").removeClass("show"),
                  $(e.target).hasClass("main-menu-sub-mega") && $(".main-header-menu .show").removeClass("show"))
                : $(e.target).closest("#mainMenuShow").length || $(e.target).closest(".main-header-menu").length || $("body").removeClass("main-header-menu-show");
        });
        $(".main-header-menu .with-sub").on("click", function (e) {
            e.preventDefault(), $(this).parent().toggleClass("show"), $(this).parent().siblings().removeClass("show");
        });
        $(".main-header-menu-header .close").on("click", function (e) {
            e.preventDefault(), $("body").removeClass("main-header-menu-show");
        });
        //end  main-header

        //start ir arriba
        $(window).on("scroll", function (e) {
            $(this).scrollTop() > 0 ? $("#back-to-top").fadeIn("slow") : $("#back-to-top").fadeOut("slow");
        });
        $("#back-to-top").on("click", function (e) {
            return $("html, body").animate({ scrollTop: 0 }, 600), !1;
        });
        //end ir arriba

        
    });
    //start sticky
    $(document).ready(function () {
        var n,
            i = $(".sticky"),
            s = "sticky-pin",
            t = i.offset();
        function o() {
            (n = i.innerHeight()), i.css({ "margin-bottom": "-" + n + "px" }), i.next().css({ "padding-top": +n + "px" });
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
    //end sticky
})();


