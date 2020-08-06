(function ($) {
    "use strict";
    var AFRA = {};

    /*====== Preloader ======*/
    var preloader = $(".preloader");
    $(window).on("load", function () {
        var preloaderFadeOutTime = 500;

        function hidePreloader() {
            preloader.fadeOut(preloaderFadeOutTime);
        }

        hidePreloader();
    });

    /*====== Select2 ======*/
    AFRA.Select2 = function () {
        function formatDefault(state) {
            if (!state.id) {
                return state.text;
            }
            var $state = $('<span class="text">' + state.text + "</span>");
            return $state;
        }

        function formatFlags(state) {
            if (!state.id) {
                return state.text;
            }
            var baseUrl = "assets/images/flags";
            var $state = $('<div class="flag"><img src="' + baseUrl + "/" + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + "</div>");
            return $state;
        }

        // Teacher
        $(".el-select2-teacher-languages").select2({
            dir: "rtl",
            placeholder: "",
            templateResult: formatFlags,
        });

        $(".el-select2-tag").select2({
            dir: "rtl",
            placeholder: "مهارت مورد نیاز",
            templateResult: formatDefault,
        });

        $(".el-select2-select-hour").select2({
            dir: "rtl",
            placeholder: "",
            minimumResultsForSearch: "Infinity",
            templateResult: formatDefault,
        });

        $(".el-select2-day").select2({
            dir: "rtl",
            placeholder: "بر اساس روز",
            templateResult: formatDefault,
        });

        $(".el-select2-hour").select2({
            dir: "rtl",
            placeholder: "بر اساس ساعت",
            templateResult: formatDefault,
        });

        $(".el-select2-gender").select2({
            dir: "rtl",
            placeholder: "جنسیت استاد",
            templateResult: formatDefault,
        });

        $(".el-select2-gender-empty").select2({
            dir: "rtl",
            placeholder: "",
            minimumResultsForSearch: "Infinity",
            templateResult: formatDefault,
        });

        $(".el-select2-course").select2({
            dir: "rtl",
            placeholder: "نوع دوره",
            templateResult: formatDefault,
        });

        $(".el-select2-age").select2({
            dir: "rtl",
            placeholder: "سن مخاطب",
            templateResult: formatDefault,
        });

        $(".el-select2-price").select2({
            dir: "rtl",
            placeholder: "بر اساس قیمت",
            templateResult: formatDefault,
        });

        $(".el-select2-level").select2({
            dir: "rtl",
            placeholder: "سطح زبان فعلی شما",
            templateResult: formatDefault,
        });

        $(".el-select2-flag").select2({
            dir: "rtl",
            placeholder: "جستجوی زبان",
            templateResult: formatFlags,
        });

        $(".el-select2-register").select2({
            dir: "rtl",
            placeholder: "",
            minimumResultsForSearch: "Infinity",
            templateResult: formatDefault,
        });
    };

    /*====== Sticky Navigation Menu ======*/
    AFRA.StickyHeader = function () {
        var header = $(".app-header");
        $(window).scroll(function () {
            if ($(this).scrollTop() > header.height()) {
                header.addClass("sticky");
            } else {
                header.removeClass("sticky");
            }
        });
    };

    AFRA.UploadAvatar = function () {
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("#imagePreview").css("background-image", "url(" + e.target.result + ")");
                    $("#imagePreview").hide();
                    $("#imagePreview").fadeIn(650);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#imageUpload").change(function () {
            readURL(this);
        });
    };

    /*====== Accordion ======*/
    AFRA.Accordion = function () {
        var toggle = $(".el-accordion .el-accordion-head");
        toggle.click(function (e) {
            e.preventDefault();

            var $this = $(this);
            var arrow = $(this).children(".inner").children(".accordion-arrow");

            console.log(arrow);

            if ($this.next().hasClass("show")) {
                $this.next().removeClass("show");
                $this.next().slideUp(350);
                arrow.removeClass("active");
                $this.parent().removeClass("active");
            } else {
                $this.parent().parent().find("li .inner").removeClass("show");
                $this.parent().parent().find("li .inner").slideUp(350);
                $this.next().toggleClass("show");
                $this.next().slideToggle(350);
                arrow.addClass("active");
                $this.parent().addClass("active");
            }
        });
    };

    /*====== Mega-Menu ======*/
    AFRA.MegaMenu = function () {
        var link = $(".app-header .has-menu");
        var header = $(".app-header");
        var overlay = $(".mega-menu-overlay");
        link.hover(
            function () {
                var id = $(this).data("megamenu-link");
                var megamenu = $("[data-megamenu-id=" + id + "]");
                megamenu.show();
                header.addClass("header-shadow");
                overlay.addClass("active");
                megamenu.addClass("active");
            },
            function () {
                var id = $(this).data("megamenu-link");
                var megamenu = $("[data-megamenu-id=" + id + "]");
                megamenu.hide(60);
                header.removeClass("header-shadow");
                overlay.removeClass("active");
                megamenu.removeClass("active");
            }
        );
    };

    /*====== Sidenav - Side Navigation Menu ======*/
    AFRA.Sidenav = function () {
        var body = $("body");
        var header = $(".app-header");
        var sidenav = $(".app-sidenav");

        var toggle = $(".app-sidenav .has-menu > a");

        toggle.on("click", function (e) {
            e.preventDefault();

            var parent = $(this).parent("li");

            if (parent.hasClass("show")) {
                parent.removeClass("show");
            } else {
                parent.addClass("show");
            }
        });
        header.on("click", ".button-open-sidenav", function () {
            sidenav.addClass("active");
            body.addClass("state-menu");
        });
        sidenav.on("click", ".button-close-sidenav, .sidenav-close", function () {
            sidenav.removeClass("active");
            body.removeClass("state-menu");
        });
    };

    /*====== Form Switch ======*/
    AFRA.StickySidebar = function () {
        if ($(window).width() >= 992) {
            $(".sticky-sidebar").stick_in_parent({
                offset_top: 99,
            });
        }
    };

    /*====== Form Switch ======*/
    AFRA.FormSwitch = function () {
        $(".input-switch input").on("change", function () {
            var dad = $(this).parent();
            if ($(this).is(":checked")) dad.addClass("checked");
            else dad.removeClass("checked");
        });
    };

    /*====== CloseItem ======*/
    AFRA.Popover = function () {
        var popover = $(".el-popover");
        popover.hover(
            function () {
                $(this).addClass("active");
            },
            function () {
                $(this).removeClass("active");
            }
        );
    };

    /*====== Calendar ======*/
    AFRA.Calendar = function () {
        var prev = $(".el-calendar-slider-prev");
        var next = $(".el-calendar-slider-next");

        prev.on("click", function (e) {
            e.preventDefault();

            var carousel = $(this).parent(".el-calendar-slider");
            var allItems = carousel.find(".el-calendar-slider-item");
            var clueItem = carousel.find(".el-calendar-slider-item.active");
            var prevItem = clueItem.prevAll(".el-calendar-slider-item:first");
            var lastItem = carousel.find(".el-calendar-slider-item:last").data("id");
            if (clueItem.data("id") < lastItem + 1) {
                next.removeClass("disabled");
            }
            if (clueItem.data("id") === 2) {
                $(this).addClass("disabled");
            } else {
                $(this).removeClass("disabled");
            }

            if (prevItem.length === 0) {
                $(this).addClass("disabled");
            } else {
                allItems.hide();
                prevItem.fadeIn();
                allItems.removeClass("active active-prev");
                prevItem.addClass("active active-prev");
            }
        });

        next.on("click", function (e) {
            e.preventDefault();

            var carousel = $(this).parent(".el-calendar-slider");
            var allItems = carousel.find(".el-calendar-slider-item");
            var clueItem = carousel.find(".el-calendar-slider-item.active");
            var nextItem = clueItem.nextAll(".el-calendar-slider-item:first");
            var lastItem = carousel.find(".el-calendar-slider-item:last").data("id");
            if (clueItem.data("id") <= 1) {
                prev.removeClass("disabled");
            }
            if (clueItem.data("id") === lastItem - 1) {
                $(this).addClass("disabled");
            } else {
                $(this).removeClass("disabled");
            }
            if (nextItem.length === 0) {
                $(this).addClass("disabled");
            } else {
                allItems.hide();
                nextItem.fadeIn();
                allItems.removeClass("active active-next");
                nextItem.addClass("active active-next");
            }
        });
    };

    /*====== Counter ======*/
    AFRA.Counter = function () {
        $(".quantity").each(function () {
            var spinner = $(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find(".quantity-up"),
                btnDown = spinner.find(".quantity-down"),
                min = input.attr("min"),
                max = input.attr("max");

            btnUp.click(function () {
                var oldValue = parseFloat(input.val());
                if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

            btnDown.click(function () {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
        });
    };

    /*====== Stepper ======*/
    AFRA.Stepper = function () {
        var form = $("#form-stepper");
        form.validate({
            errorPlacement: function errorPlacement(error, element) {
                element.before(error);
            },
            messages: {},
            errorElement: "div",
            errorLabelContainer: ".el-stepper-error",
        });
        form.children("div").steps({
            headerTag: "h3",
            autoFocus: true,
            labels: {
                next: "بعدی",
                finish: "پایان",
            },
            onStepChanging: function (event, currentIndex, newIndex) {
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            },
            onFinishing: function (event, currentIndex) {
                form.validate().settings.ignore = ":disabled";
                return form.valid();
            },
            onFinished: function (event, currentIndex) {
                alert("اطلاعات به درستی ارسال شد!");
            },
        });
    };

    /*====== Calendar Tabs ======*/
    AFRA.CalendarTabs = function () {
        var links = $(".el-calendar-tabs .el-calendar-tabs-links li");
        links.on("click", function () {
            var links = $(this).parent().children();
            var items = $(this).parent().siblings();
            var filter = $(this).attr("data-filter");
            links.removeClass("active");
            $(this).addClass("active");
            if (filter == "all") {
                items.show(60);
            } else {
                items.hide(600);
                items.siblings("[data-filter=" + filter + "]").show(180);
            }
        });
    };

    /*====== Calendar Select ======*/
    AFRA.CalendarSelect = function () {
        var form = $("#form-calendar-time");
        var hour = $("#afra-calendar .day-hours .hour");
        var calendar = $("#afra-calendar");
        var widget = $("#widget-calendar-reserved .reserved");

        hour.on("click", function (e) {
            if ($(this).hasClass("reserved")) {
                alert("ساعت انتخاب شده رزرو شده است.")
            } else if ($(this).hasClass("inactive")) {
                alert("ساعت انتخاب شده غیر فعال است.")
            } else if ($(this).hasClass("clicked")) {
                widget.find("li:last").remove();
                form.find("input:last").remove();
                $(this).removeClass("clicked");
                alert("ساعت انتخاب شده با موفقیت حذف شد.")
            } else {
                e.preventDefault();
                $(this).addClass("clicked");
                var time = $(this).data("calendar-time");
                var date = $(this).data("calendar-date");
                var weekday = $(this).data("calendar-weekday");
                var start = $(this).data("calendar-start");
                var end = $(this).data("calendar-end");
                widget.append('<li><p><span class="time">' + weekday + " - " + start + " تا " + end + ' </span><span class="date">' + date + "</span></p></li>");
                form.append('<input type="hidden" name="hours[]" value="' + time + '" />');
            }
        });
    };

    /*====== Sidenav Filtering ======*/
    AFRA.SidenavFilter = function () {
        var body = $("body");
        var button = $(".button-open-sidenav-filter");
        var sidenav = $("#sidenav-filter");
        var buttonClose = $(".sidenav-filter-close");
        button.on("click", function (e) {
            e.preventDefault();
            body.addClass("state-menu");
            sidenav.addClass("active");
        });
        buttonClose.on("click", function (e) {
            e.preventDefault();
            body.removeClass("state-menu");
            sidenav.removeClass("active");
        });
    };

    /*====== Sidenav Sorting ======*/
    AFRA.SidenavSorting = function () {
        var body = $("body");
        var button = $(".button-open-sidenav-sorting");
        var sidenav = $("#sidenav-sorting");
        var buttonClose = $(".sidenav-mobile-close");
        button.on("click", function (e) {
            e.preventDefault();
            body.addClass("state-menu");
            sidenav.addClass("active");
        });
        buttonClose.on("click", function (e) {
            e.preventDefault();
            body.removeClass("state-menu");
            sidenav.removeClass("active");
        });
    };

    /*====== Select Multiple ClassRooms ======*/
    AFRA.MultipleClassRooms = function () {
        var value = 1;
        var select = $("#form-details-of-classrooms").children("ul");
        var btnAppend = $("#button-append-classroom");
        var btnDelete = $("#button-delete-classroom");
        btnAppend.on("click", function (e) {
            if (value < 15) {
                e.preventDefault();
                value = value + 1;
                $(".input-datepicker:last").persianDatepicker({
                    startDate: "today",
                    endDate: "1400/1/1",
                });
                select
                    .append("<li> <h4>جلسه <span>" + value + '</span></h4> <div class="row row-sm"> <div class="col-12 col-sm-12 col-md-6"> <div class="form-item"> <label class="form-label">تاریخ شروع</label> <input type="text" name="date[]" class="input-datepicker" required /> </div> </div> <div class="col-12 col-sm-12 col-md-6"> <div class="form-item"> <label for="input-type" class="form-label">ساعت شروع</label> <div class="input-select"> <select class="el-select2-select-hour" name="hour[]" required> <option value="">&nbsp;</option> <option value="7">07:00</option> <option value="8">08:00</option> <option value="9">09:00</option> <option value="10">10:00</option> <option value="11">11:00</option> <option value="12">12:00</option> <option value="13">13:00</option> <option value="14">14:00</option> <option value="15">15:00</option> <option value="16">16:00</option> <option value="17">17:00</option> <option value="18">18:00</option> <option value="19">19:00</option> <option value="20">20:00</option> <option value="21">21:00</option> <option value="22">22:00</option> </select> </div> </div> </div> </div> </li>')
                    .find(".input-datepicker:last")
                    .persianDatepicker({
                        startDate: "today",
                        endDate: "1400/1/1",
                    });
            }
        });
        btnDelete.on("click", function (e) {
            e.preventDefault();
            if (value > 1) {
                value--;
                select.find("li:last-child").remove();
            }
        });
    };

    /*====== DatePicker ======*/
    AFRA.DatePicker = function () {
        $(".input-datepicker").persianDatepicker({
            startDate: "today",
            endDate: "1400/1/1",
        });
    };

    $(window).on("load", function () {});

    $(document).ready(function () {
        AFRA.MultipleClassRooms(), AFRA.MegaMenu(), AFRA.Stepper(), AFRA.Counter(), AFRA.StickyHeader(), AFRA.StickySidebar(), AFRA.Sidenav(), AFRA.SidenavFilter(), AFRA.SidenavSorting(), AFRA.Select2(), AFRA.Accordion(), AFRA.FormSwitch(), AFRA.Calendar(), AFRA.CalendarTabs(), AFRA.CalendarSelect(), AFRA.Popover(), AFRA.UploadAvatar(), AFRA.DatePicker();
    });
})(jQuery);

$(document).ready(function () {
    var swiperTeachers = new Swiper(".swiper-teachers", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            100: {
                slidesPerView: 1.4,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 2.4,
                spaceBetween: 12,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1100: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            1300: {
                slidesPerView: 4.5,
                spaceBetween: 15,
            },
        },
    });

    var swiperTestimonial = new Swiper(".swiper-testimonial", {
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 45,
            },
        },
    });
});
