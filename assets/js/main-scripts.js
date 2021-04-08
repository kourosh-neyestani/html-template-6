var AFRA = {};

(function ($) {
    var selectedClassroomCount = 0;
    var plan1 = $("#pass-data-from-here").data("plan-1") || 0;
    var plan2 = $("#pass-data-from-here").data("plan-2") || 0;
    var plan3 = $("#pass-data-from-here").data("plan-3") || 0;
    let course_price = $("#pass-data-from-here").data("course-price") || 0;

    plan1 = parseInt(plan1);
    plan2 = parseInt(plan2);
    plan3 = parseInt(plan3);
    course_price = parseInt(course_price);

    let total_price = 0;
    let final_price = total_price;
    let discount_price = 0;
    let user_plan = 0;

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

        $(".el-select2").select2({
            dir: "rtl",
            placeholder: "",
            templateResult: formatDefault,
        });

        $(".el-select2-multi-flag").select2({
            dir: "rtl",
            templateResult: formatFlags,
        });

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

        $(".el-select2-teacher-skills").select2({
            dir: "rtl",
            placeholder: "بر اساس روز",
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

    /*====== Modal ======*/
    AFRA.Modal = function () {
        var body = $("body");
        var btnModal = $("button[data-modal-id], .afc-calendar-week__day > ul > li[data-modal-id]:not(.booked)");
        var btnClose = $(".el-modal-overlay .modal-close");

        btnModal.on("click", function (e) {
            e.preventDefault();
            var data = $(this).data("modal-id");
            var overlay = $(".el-modal-overlay[data-modal-id=" + data + "]");
            var modal = overlay.find(".el-modal");
            body.addClass("state-menu");
            modal.addClass("active");
            overlay.show();
            overlay.addClass("active");
            console.log(btnModal);

            if (data === "modal-afc-stepper-calendar") {
                $(".afc-sticky-reserve").addClass("active");
            }
        });

        btnClose.on("click", function () {
            var modal = $(".el-modal");
            var overlay = $(".el-modal-overlay");
            console.log("c");
            body.removeClass("state-menu");
            modal.removeClass("active");
            overlay.hide();
            overlay.removeClass("active");

            if ($(".afc-sticky-reserve").length) {
                $(".afc-sticky-reserve").removeClass("active");
            }
        });
    };

    /*====== Modal Classrooms ======*/
    AFRA.ModalClassrooms = function () {
        var body = $("body");
        var btnModal = $("button#button-for-modal-classrooms[data-modal-id-classroom]");
        var btnClose = $(".el-modal-overlay .modal-close");

        btnModal.on("click", function (e) {
            e.preventDefault();
            if (selectedClassroomCount !== 0) {
                var data = $(this).data("modal-id-classroom");
                var overlay = $(".el-modal-overlay[data-modal-id=" + data + "]");
                var modal = overlay.find(".el-modal");
                body.addClass("state-menu");
                modal.addClass("active");
                overlay.show();
                overlay.addClass("active");
                console.log(btnModal);
            } else {
                alert("ابتدا جلسات رو از تقویم انتخاب نمایید");
            }
        });

        btnClose.on("click", function () {
            var modal = $(".el-modal");
            var overlay = $(".el-modal-overlay");
            console.log("c");
            body.removeClass("state-menu");
            modal.removeClass("active");
            overlay.hide();
            overlay.removeClass("active");
        });
    };

    /*====== Modal Tabs ======*/
    AFRA.ModalTabs = function () {
        var link = $("[data-modal-tab-link]");

        link.on("click", function () {
            var data = $(this).data("modal-tab-link");
            var content = $("[data-modal-tab-content='" + data + "']");
            if (!$(this).hasClass("active")) {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                content.siblings().removeClass("active");
                content.addClass("active");
            }
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

    /*====== Modal Tabs ======*/
    AFRA.Test = function () {
        var count = 0;
    };

    AFRA.MathClassrooms = function () {
        if (selectedClassroomCount > 0 && selectedClassroomCount <= 5) {
            final_price = total_price - (total_price * plan1) / 100;
            user_plan = plan1;
        } else if (selectedClassroomCount > 5 && selectedClassroomCount <= 10) {
            final_price = total_price - (total_price * plan2) / 100;
            user_plan = plan2;
        } else if (selectedClassroomCount > 10) {
            final_price = total_price - (total_price * plan3) / 100;
            user_plan = plan3;
        }

        discount_price = total_price - final_price;

        document.getElementById("total_price").innerHTML = total_price;
        document.getElementById("final_price").innerHTML = final_price;
        document.getElementById("discount_price").innerHTML = discount_price;
        document.getElementById("user_plan").innerHTML = user_plan;
        document.getElementById("selectedClassroomCount").innerHTML = selectedClassroomCount;
    };

    /*====== Calendar Select ======*/
    AFRA.CalendarSelect = function () {
        var form = $("#form-calendar-time");
        var hour = $("#afra-calendar .day-hours .hour");
        var calendar = $("#afra-calendar");
        var widget = $("#widget-calendar-reserved .reserved");

        hour.on("click", function (e) {
            if ($(this).hasClass("reserved")) {
                alert("ساعت انتخاب شده رزرو شده است.");
            } else if ($(this).hasClass("inactive")) {
                alert("ساعت انتخاب شده غیر فعال است.");
            } else if ($(this).hasClass("clicked")) {
                widget.find("li:last").remove();
                form.find("input:last").remove();
                $(this).removeClass("clicked");
                alert("ساعت انتخاب شده با موفقیت حذف شد.");
                selectedClassroomCount = selectedClassroomCount - 1;
                total_price = total_price - course_price;
                console.log(selectedClassroomCount);
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
                selectedClassroomCount = selectedClassroomCount + 1;
                total_price = total_price + course_price;
            }

            AFRA.MathClassrooms();
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
            $("#sidenav-sorting").removeClass("active");
        });
        buttonClose.on("click", function (e) {
            e.preventDefault();
            body.removeClass("state-menu");
            sidenav.removeClass("active");
            $("#sidenav-sorting").removeClass("active");
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
            $("#sidenav-filter").removeClass("active");
        });
        buttonClose.on("click", function (e) {
            e.preventDefault();
            body.removeClass("state-menu");
            sidenav.removeClass("active");
            $("#sidenav-filter").removeClass("active");
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

    /*====== NewTags ======*/
    AFRA.NewTags = function () {
        var more = $(".el-new-tags .more-tags");

        more.on("click", function () {
            var tags = $(this).parent(".el-new-tags");
            tags.toggleClass("show");
            $(this).toggleClass("less");
            $(this).text(function (i, text) {
                return text === "+" ? "-" : "+";
            });
        });
    };

    $(window).on("load", function () {});

    $(document).ready(function () {
        AFRA.MultipleClassRooms(), AFRA.Test(), AFRA.MegaMenu(), AFRA.Stepper(), AFRA.Counter(), AFRA.StickyHeader(), AFRA.StickySidebar(), AFRA.Sidenav(), AFRA.SidenavFilter(), AFRA.SidenavSorting(), AFRA.Select2(), AFRA.Accordion(), AFRA.FormSwitch(), AFRA.Calendar(), AFRA.CalendarTabs(), AFRA.CalendarSelect(), AFRA.Popover(), AFRA.UploadAvatar(), AFRA.DatePicker(), AFRA.Modal(), AFRA.ModalTabs(), AFRA.ModalClassrooms(), AFRA.NewTags();
    });
})(jQuery);

(function ($) {
    /*====== Assets v2.0 ======*/
    var session;
    var classes = [];
    var user_role = null;
    var user_mobile_code = null;
    // var user_mobile_prefix = "98";
    // var user_mobile_suffix = null;
    var user_mobile_number = null;
    var try_again_time = 180000;

    /*====== Calendar v2.0 ======*/
    AFRA.Calendar_v2 = function () {
        var form = $("#afc-form-calendar-times-v2");
        var calendar = $(".afc-calendar[data-clickable='true']");
        var selected = $(".afc-selected-times").find("ul");
        var selected2 = $(".afc-sticky-reserve_mobile_modal_list");

        if (!calendar.length) {
            return;
        }

        if (!selected.length) {
            return;
        }

        calendar.on("click", "li", function () {
            var that = $(this),
                time = that[0].attributes.getNamedItem("data-calendar-time").nodeValue,
                date = that.parent("ul").data("calendar-date"),
                weekday = that.parent("ul").data("calendar-weekday"),
                start_time = that.find(".data-calendar-hour").text(),
                final_time = that.data("calendar-end-time"),
                input = '<input type="hidden" name="classes[]" data-input-for-classes="' + time + '" value="' + time + '"/>',
                output = '<li data-calendar-selected-id="' + time + '"><span class="afc-selected-times__close">&#10005</span><span class="afc-selected-times__value">' + weekday + " " + date + " " + start_time + "-" + final_time + "</span></li>";

            if (that.hasClass("booked")) {
                alert("ساعت انتخاب شده رزرو شده است.");
            } else if (that.hasClass("disabled")) {
                alert("ساعت انتخاب شده غیر فعال است.");
            } else if (that.hasClass("selected")) {
                if ($.inArray(time, classes) > -1) {
                    that.removeClass("selected");
                    classes.splice($.inArray(time, classes), 1);
                    selected.find("li[data-calendar-selected-id='" + time + "']").remove();
                    selected2.find("li[data-calendar-selected-id='" + time + "']").remove();
                    form.find("[data-input-for-classes='" + time + "']").remove();
                    alert("ساعت انتخاب شده با موفقیت حذف شد.");
                } else {
                    console.log("Error: Element dose't exist in Classes[].");
                }
            } else {
                if (session === 0) {
                    if (classes.length === 0) {
                        that.addClass("selected");
                        classes.push(time);
                        selected.append(output);
                        selected2.append(output);
                        form.append(input);
                    } else if (classes.length === 1) {
                        classes = [];
                        form.find("[data-input-for-classes]").remove();
                        selected.children("li").remove();
                        selected2.children("li").remove();
                        calendar.find("li").removeClass("selected");
                        that.addClass("selected");
                        classes.push(time);
                        selected.append(output);
                        selected2.append(output);
                        form.append(input);
                    }
                } else if (session === 1) {
                    if (classes.length === 0) {
                        that.addClass("selected");
                        classes.push(time);
                        selected.append(output);
                        selected2.append(output);
                        form.append(input);
                    } else {
                        alert("بیش از انتخاب جلسات نمیتوانید انتخاب کنید.");
                    }
                } else if (session === 5) {
                    if (classes.length < 5) {
                        that.addClass("selected");
                        classes.push(time);
                        selected.append(output);
                        selected2.append(output);
                        form.append(input);
                    } else {
                        alert("بیش از انتخاب جلسات نمیتوانید انتخاب کنید.");
                    }
                } else if (session === 10) {
                    if (classes.length < 10) {
                        that.addClass("selected");
                        classes.push(time);
                        selected.append(output);
                        selected2.append(output);
                        form.append(input);
                    } else {
                        alert("بیش از انتخاب جلسات نمیتوانید انتخاب کنید.");
                    }
                }
            }

            if (typeof classes !== "undefined" && classes.length !== 0) {
                $(".afc-selected-times__title").show();
            } else {
                $(".afc-selected-times__title").hide();
            }

            AFRA.StepperStatus_v2();
        });

        if (selected.length) {
            selected.on("click", "li", function () {
                var time = $(this)[0].attributes.getNamedItem("data-calendar-selected-id").nodeValue;

                if ($.inArray(time, classes) > -1) {
                    calendar.find("li[data-calendar-time='" + time + "']").removeClass("selected");
                    classes.splice($.inArray(time, classes), 1);
                    form.find("[data-input-for-classes='" + time + "']").remove();
                    $(this).remove();
                    selected2.children("li[data-calendar-selected-id='" + time + "']").remove();

                    if ($(".afc-sticky-reserve_mobile_btn_count").length) {
                        $(".afc-sticky-reserve_mobile_btn_count").html(classes.length);
                    }
                }
            });
        }

        if (selected2.length) {
            selected2.on("click", "li", function () {
                var time = $(this)[0].attributes.getNamedItem("data-calendar-selected-id").nodeValue;

                if ($.inArray(time, classes) > -1) {
                    calendar.find("li[data-calendar-time='" + time + "']").removeClass("selected");
                    classes.splice($.inArray(time, classes), 1);
                    form.find("[data-input-for-classes='" + time + "']").remove();
                    $(this).remove();
                    selected.children("[data-calendar-selected-id='" + time + "']").remove();

                    if ($(".afc-sticky-reserve_mobile_btn_count").length) {
                        $(".afc-sticky-reserve_mobile_btn_count").html(classes.length);
                    }
                }
            });
        }
    };

    /*====== Stepper v2.0 ======*/
    AFRA.StepperStatus_v2 = function () {
        var stepper = $(".afc-stepper");

        if (!stepper.length) {
            return;
        }

        if (typeof classes !== "undefined" && classes.length !== 0) {
            $("[data-chain-id='2']").find(".button-primary").removeClass("disable");
            $(".afc-sticky-reserve_mobile_btn").addClass("active");
        } else {
            $("[data-chain-id='2']").find(".button-primary").addClass("disable");
            $(".afc-sticky-reserve_mobile_btn").removeClass("active");
        }

        if (session === 0) {
            $(".afc-sticky-reserve_teacher_count").html(" ۱ جلسه رایگان");
            $(".afc-sticky-reserve_teacher_price").html("");
        } else if (session !== "undefined") {
            $(".afc-sticky-reserve_teacher_count").html(session + " جلسه خصوصی");
            $(".afc-sticky-reserve_teacher_price").html(session * parseInt($(".afc-sticky-reserve_teacher_price").data("price")) + " تومان");
        }

        if ($(".afc-sticky-reserve_mobile_btn_count").length) {
            $(".afc-sticky-reserve_mobile_btn_count").html(classes.length);
        }

        AFRA.Stepper_v2();
    };

    /*====== Stepper v2.0 ======*/
    AFRA.Stepper_v2 = function () {
        var stepper = $(".afc-stepper");

        if (!stepper.length) {
            return;
        }

        var link = $("[data-step-to]"),
            chain = $(".active[data-chain-to]");

        link.on("click", function (e) {
            e.preventDefault();

            if (typeof session == "undefined") {
                return;
            }

            var step_id = $(this).data("step-to");

            if (step_id === 3) {
                if (classes.length === 0 && !$(this).hasClass("button-default")) {
                    return;
                } else {
                    $("[data-step-id]").removeClass("active");
                    $("[data-step-to]").removeClass("active");
                    $('[data-step-id="3"]').addClass("active");
                    $('[data-step-to="3"]').addClass("active");
                    $("[data-chain-id]").removeClass("active");
                    $('[data-chain-id="3"]').addClass("active");
                }
            } else if (step_id === 2) {
                $("[data-step-id]").removeClass("active");
                $("[data-step-to]").removeClass("active");
                $('[data-step-id="2"]').addClass("active");
                $('[data-step-to="2"]').addClass("active");
                $("[data-chain-id]").removeClass("active");
                $('[data-chain-id="2"]').addClass("active");
            } else if (step_id === 1) {
                $("[data-step-id]").removeClass("active");
                $("[data-step-to]").removeClass("active");
                $('[data-step-id="1"]').addClass("active");
                $('[data-step-to="1"]').addClass("active");
                $("[data-chain-id]").removeClass("active");
                $('[data-chain-id="1"]').addClass("active");
            }
        });

        chain.on("click", function () {
            var chain_id = $(this).data("chain-to");

            $("[data-chain-to]").removeClass("active");
            $('[data-chain-to="' + chain_id + '"]').addClass("active");
        });
    };

    /*====== Calendar Slider v2.0 ======*/
    AFRA.CalendarCarousel_v2 = function () {
        var carousel = $(".afc-carousel");

        if (!carousel.length) {
            return;
        }

        var position = 0,
            prev = carousel.find(".afc-carousel__prev"),
            next = carousel.find(".afc-carousel__next");

        prev.on("click", function (e) {
            e.preventDefault();

            var parent = $(this).parent().parent(".afc-carousel");

            var allItems = parent.find(".afc-carousel__slide");
            var clueItem = parent.find(".afc-carousel__slide.active");
            var prevItem = clueItem.prevAll(".afc-carousel__slide:first");
            var lastItem = parent.find(".afc-carousel__slide:last").data("slide-id");

            var nextButton = parent.find(".afc-carousel__next");

            if ($(this).hasClass("disabled")) {
                return;
            }

            if (clueItem.data("slide-id") < lastItem + 1) {
                nextButton.removeClass("disabled");
            }

            if (clueItem.data("slide-id") === 2) {
                $(this).addClass("disabled");
            } else {
                $(this).removeClass("disabled");
            }

            if (prevItem.length === 0) {
                $(this).addClass("disabled");
                position = 0;
            } else {
                allItems.hide();
                prevItem.fadeIn();
                allItems.removeClass("active active-prev");
                prevItem.addClass("active active-prev");
                position = position - 1;
            }
        });

        next.on("click", function (e) {
            e.preventDefault();

            var parent = $(this).parent().parent(".afc-carousel");

            var allItems = parent.find(".afc-carousel__slide");
            var clueItem = parent.find(".afc-carousel__slide.active");
            var nextItem = clueItem.nextAll(".afc-carousel__slide:first");
            var lastItem = parent.find(".afc-carousel__slide:last").data("slide-id");

            var prevButton = parent.find(".afc-carousel__prev");

            if ($(this).hasClass("disabled")) {
                return;
            }

            if (clueItem.data("slide-id") <= 1) {
                prevButton.removeClass("disabled");
            }

            if (clueItem.data("slide-id") === lastItem - 1) {
                $(this).addClass("disabled");
            } else {
                $(this).removeClass("disabled");
            }

            if (nextItem.length === 0) {
                $(this).addClass("disabled");
                position = 3;
            } else {
                allItems.hide();
                nextItem.fadeIn();
                allItems.removeClass("active active-next");
                nextItem.addClass("active active-next");
                position = position + 1;
            }
        });
    };

    /*====== Calendar Set Sessions v2.0 ======*/
    AFRA.CalendarSetSessions_v2 = function () {
        // Set Sessions
        $("[data-set-sessions]").on("click", function (e) {
            e.preventDefault();

            var value = $(this).data("set-sessions"),
                selected = $(".afc-selected-times").find("ul"),
                selected2 = $(".afc-sticky-reserve_mobile_list"),
                inputs = $("#afc-form-calendar-times-v2").find("[data-input-for-classes]");

            classes = [];
            session = value;
            selected.children("li").remove();
            selected2.children("li").remove();

            if (inputs.length) {
                inputs.remove();
            }

            $(".afc-selected-times__title").hide();
            $(".afc-calendar").find("li.selected").removeClass("selected");
            $(".afc-calendar").find("li.selected").removeClass("selected");
            $(".afc-form-input-package").val(session);
            $("[data-chain-id='1']").find("button").removeClass("disable");

            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            AFRA.StepperStatus_v2();
        });
    };

    /*====== Select2 ======*/
    AFRA.Select2_v2 = function () {
        function setPrefix(prefix) {
            if (!prefix.id) {
                return prefix.text;
            }
            var $prefix = $('<div class="afc-flag"><img src="assets/images/flags/' + prefix.element.value.toLowerCase() + '.png" class="afc-flag__img" /> ' + prefix.text + "</div>");

            return $prefix;
        }

        $(".afc-select2-mobile-prefix").select2({
            dir: "ltr",
            placeholder: "پیش شماره",
            templateResult: setPrefix,
            templateSelection: setPrefix,
        });
    };

    /*====== Login/Register Form ======*/
    AFRA.RegisterForm_v2 = function () {
        var url = "http://httpbin.org/post",
            url_confirm = "http://httpbin.org/post",
            assets = $(".afc-form"),
            btn_set_role = assets.find("[data-set-user-role]"), // student || teacher
            btn_edit_number = assets.find(".afc-btn-edit-mobile-number"),
            btn_submit_code = assets.find(".afc-btn-submit-code"), // Disable
            btn_submit_mobile = assets.find(".afc-btn-submit-mobile, .afc-try-again__button"), // Disable
            input_mobile_code = assets.find(".afc-set-user-mobile-code"),
            input_mobile_number = assets.find(".afc-set-user-mobile-number");

        var try_again = $(".afc-try-again"),
            try_again_timer = try_again.find("[data-validation-code-timer]");

        var timer;

        function myTimer() {
            var counter = 180;
            try_again_timer.html(counter);

            clearInterval(timer);

            timer = setInterval(function () {
                counter--;
                console.log(counter);
                try_again_timer.html(counter);
                if (counter === 0) {
                    clearInterval(timer);
                    try_again.addClass("active");
                }
            }, 1000);
        }

        btn_set_role.on("click", function (e) {
            e.preventDefault();

            var role = $(this).data("set-user-role");

            if (typeof role !== "string") {
                return;
            }

            user_role = role;

            $("[data-auth-panel]").removeClass("active");
            $("[data-auth-panel='2']").addClass("active");
        });

        input_mobile_number.on("keyup", function (e) {
            var mobile = e.target.value;

            if (typeof mobile !== "string") {
                return;
            }

            if (mobile.length === 11) {
                user_mobile_number = mobile;
                btn_submit_mobile.removeClass("disable");
            } else {
                user_mobile_number = null;
                btn_submit_mobile.addClass("disable");
            }
        });

        btn_submit_mobile.on("click", function (e) {
            e.preventDefault();

            if (user_mobile_number === null) {
                return;
            }

            if (user_mobile_number.length !== 11) {
                return;
            }

            $(this).addClass("loading");

            try_again.removeClass("active");
            myTimer();

            // Ajax. Post.
            $.ajax({
                url: url,
                type: "post",
                data: {
                    role: user_role,
                    mobile: user_mobile_number,
                },
                success: function (data, textStatus, xhr) {
                    if (xhr.status === 200) {
                        $("[data-auth-panel]").removeClass("active");
                        $("[data-auth-panel='3']").addClass("active");
                        $(".afc-set-user-mobile-code").val(null);
                    } else {
                        if (typeof data.message !== "undefined") {
                            alert("data.message");
                        } else {
                            alert("شماره موبایل وارد شده صحیح نمی‌باشد. لطفا دوباره امتحان کنید.");
                        }
                    }
                },
                error: function () {
                    console.log("مشکلی در برقراری ارتباط با سرور پیش آمده، کمی بعد تر دوباره امتحان کنید.");
                },
                complete: function (xhr, textStatus) {
                    if (xhr.status !== 200) {
                        alert("مشکلی در برقراری ارتباط با سرور پیش آمده، کمی بعد تر دوباره امتحان کنید.");
                    }
                },
            });
        });

        input_mobile_code.on("keyup", function (e) {
            var code = e.target.value;

            if (typeof code !== "string") {
                return;
            }

            if (code.length === 4) {
                user_mobile_code = code;
                btn_submit_code.removeClass("disable");

                $.ajax({
                    url: url_confirm,
                    type: "post",
                    data: {
                        role: user_role,
                        code: user_mobile_code,
                        mobile: user_mobile_number,
                    },
                    success: function (data, textStatus, xhr) {
                        if (xhr.status === 200) {
                            setTimeout(function () {
                                location.reload();
                            }, 1000);
                        } else {
                            if (typeof data.message !== "undefined") {
                                alert(data.message);
                            } else {
                                alert("کد فعالسازی وارد شده صحیح نمی‌باشد‌. لطفا دوباره امتحان کنید.");
                            }
                        }
                    },
                    error: function () {
                        console.log("مشکلی در برقراری ارتباط با سرور پیش آمده، کمی بعد تر دوباره امتحان کنید.");
                    },
                    complete: function (xhr, textStatus) {
                        if (xhr.status !== 200) {
                            alert("مشکلی در برقراری ارتباط با سرور پیش آمده، کمی بعد تر دوباره امتحان کنید.");
                        }
                    },
                });
            } else {
                user_mobile_code = null;
                btn_submit_code.addClass("disable");
            }
        });

        btn_submit_code.on("click", function (e) {
            e.preventDefault();

            if (user_mobile_code.length !== 4) {
                return;
            }

            var check_classname = false;

            if ($(this).hasClass("afc-button-modal-submit-code")) {
                check_classname = true;
            }

            // Ajax. Post.
            $.ajax({
                url: url_confirm,
                type: "post",
                data: {
                    role: user_role,
                    code: user_mobile_code,
                    mobile: user_mobile_number,
                },
                success: function (data, textStatus, xhr) {
                    if (xhr.status === 200) {
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } else {
                        if (typeof data.message !== "undefined") {
                            alert(data.message);
                        } else {
                            alert("کد فعالسازی وارد شده صحیح نمی‌باشد‌. لطفا دوباره امتحان کنید.");
                        }
                    }
                },
                error: function () {
                    console.log("مشکلی در برقراری ارتباط با سرور پیش آمده، کمی بعد تر دوباره امتحان کنید.");
                },
                complete: function (xhr, textStatus) {
                    if (xhr.status !== 200) {
                        alert("مشکلی در برقراری ارتباط با سرور پیش آمده، کمی بعد تر دوباره امتحان کنید.");
                    }
                },
            });
        });

        btn_edit_number.on("click", function (e) {
            e.preventDefault();

            clearInterval(timer);

            user_mobile_number = null;

            $(".afc-btn-submit-mobile").removeClass("loading");

            $("[data-auth-panel]").removeClass("active");
            $("[data-auth-panel='2']").addClass("active");
        });

        $(".afc-try-again__button").on("click", function () {
            myTimer();
        });
    };

    $(document).ready(function () {
        AFRA.Select2_v2();
        AFRA.Stepper_v2();
        AFRA.Calendar_v2();
        AFRA.CalendarCarousel_v2();
        AFRA.CalendarSetSessions_v2();
        AFRA.RegisterForm_v2();

        $(".afc-sticky-reserve_mobile_btn").on("click", function () {
            var modal = $(this).siblings(".afc-sticky-reserve_mobile_modal");
            modal.addClass("active");
        });
        $(".afc-sticky-reserve_mobile_modal_close").on("click", function () {
            var modal = $(this).parent().parent(".afc-sticky-reserve_mobile_modal");
            modal.removeClass("active");
        });
    });
})(jQuery);

$(document).ready(function () {
    var swiperTeachers = new Swiper(".swiper-teachers", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            100: {
                slidesPerView: 1.4,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 12,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1100: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1300: {
                slidesPerView: 3.5,
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

(function ($) {
    /*====== afc-content-slider ======*/
    AFRA.AFC_TextSlider = function () {
        var el = $(".afc-text-slider"),
            co = el.find(".afc-text-slider_collapser");

        co.on("click", function (e) {
            e.preventDefault();
            $(this).parent(".afc-text-slider").toggleClass("collapsed");
            $(this);
        });
    };

    $(document).ready(function () {
        AFRA.AFC_TextSlider();
    });
})(jQuery);
