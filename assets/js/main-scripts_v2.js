(function ($) {
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

    /*====== Assets v2.0 ======*/
    var package;
    var classes = [];
    var user_role = null;
    var user_mobile_code = null;
    var user_mobile_prefix = "98";
    var user_mobile_suffix = null;
    var user_mobile_number = null;
    var try_again_time = 180000;

    /*====== Calendar v2.0 ======*/
    AFRA.Calendar_v2 = function () {
        var form = $("#afc-form-calendar-times-v2");
        var calendar = $(".afc-calendar[data-clickable='true']");
        var selected = $(".afc-selected-times").find("ul");
        var selected2 = $(".afc-selected-times__mobile__modal__list");

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
                if (package === 0) {
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
                } else if (package === 1) {
                    if (classes.length === 0) {
                        that.addClass("selected");
                        classes.push(time);
                        selected.append(output);
                        selected2.append(output);
                        form.append(input);
                    } else {
                        alert("بیش از انتخاب جلسات نمیتوانید انتخاب کنید.");
                    }
                } else if (package === 5) {
                    if (classes.length < 5) {
                        that.addClass("selected");
                        classes.push(time);
                        selected.append(output);
                        selected2.append(output);
                        form.append(input);
                    } else {
                        alert("بیش از انتخاب جلسات نمیتوانید انتخاب کنید.");
                    }
                } else if (package === 10) {
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

            if (typeof classes !== undefined && classes.length !== 0) {
                $(".afc-selected-times__title").show();
            } else {
                $(".afc-selected-times__title").hide();
            }

            AFRA.StepperStatus_v2();
        });

        selected.on("click", "li", function () {
            var time = $(this)[0].attributes.getNamedItem("data-calendar-selected-id").nodeValue;

            if ($.inArray(time, classes) > -1) {
                calendar.find("li[data-calendar-time='" + time + "']").removeClass("selected");
                classes.splice($.inArray(time, classes), 1);
                form.find("[data-input-for-classes='" + time + "']").remove();
                $(this).remove();
            }
        });

        selected2.on("click", "li", function () {
            var time = $(this)[0].attributes.getNamedItem("data-calendar-selected-id").nodeValue;

            if ($.inArray(time, classes) > -1) {
                calendar.find("li[data-calendar-time='" + time + "']").removeClass("selected");
                classes.splice($.inArray(time, classes), 1);
                form.find("[data-input-for-classes='" + time + "']").remove();
                $(this).remove();
            }
        });
    };

    /*====== Stepper v2.0 ======*/
    AFRA.StepperStatus_v2 = function () {
        var stepper = $(".afc-stepper");

        if (typeof package !== undefined) {
            stepper.find('[data-step-to="2"]').removeClass("disable").addClass("active");
        }

        if (typeof classes !== undefined && classes.length !== 0) {
            stepper.find('[data-step-to="3"]').removeClass("disable").addClass("active");
        }

        if (typeof classes !== undefined && classes.length !== 0) {
            $(".afc-selected-times__mobile__button").addClass("active");
        } else {
            $(".afc-selected-times__mobile__button").removeClass("active");
        }

        if (package === 0) {
            $(".afc-selected-times__with__count").html(" ۱ جلسه رایگان");
        } else if (package !== undefined) {
            $(".afc-selected-times__with__count").html(package + " جلسه خصوصی");
            $(".afc-selected-times__with__price").html(package * parseInt($(".afc-selected-times__with__price").data("price")) + " تومان");
        }

        AFRA.Stepper_v2();
    };

    /*====== Stepper v2.0 ======*/
    AFRA.Stepper_v2 = function () {
        var stepper = $(".afc-stepper");

        if (!stepper.length) {
            return;
        }

        var link = stepper.find(".active[data-step-to]");

        link.on("click", function () {
            var step_id = $(this).data("step-to");

            stepper.find("[data-step-id]").removeClass("active");
            stepper.find('[data-step-id="' + step_id + '"]').addClass("active");
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
                selected2 = $(".afc-selected-times__mobile__modal__list"),
                inputs = $("#afc-form-calendar-times-v2").find("[data-input-for-classes]");

            classes = [];
            package = value;
            selected.children("li").remove();
            selected2.children("li").remove();

            if (inputs.length) {
                inputs.remove();
            }

            $(".afc-selected-times__title").hide();
            $(".afc-calendar").find("li.selected").removeClass("selected");
            $(".afc-calendar").find("li.selected").removeClass("selected");
            $(".afc-form-input-package").val(package);

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

    /*====== Register Form ======*/
    AFRA.RegisterForm_v2 = function () {
        var url = "http://httpbin.org/post",
            url_confirm = "http://httpbin.org/post",
            assets = $(".afc-form"),
            panel = assets.find("[data-auth-panel]"),
            btn_set_role = assets.find("[data-set-user-role]"), // student || teacher
            btn_submit_code = assets.find(".afc-btn-submit-code"), // Disable
            btn_submit_mobile = assets.find(".afc-btn-submit-mobile, .afc-try-again__button"), // Disable
            input_mobile_code = assets.find(".afc-set-user-mobile-code"),
            input_mobile_prefix = assets.find(".afc-set-user-mobile-prefix"),
            input_mobile_number = assets.find(".afc-set-user-mobile-number");

        var try_again = $(".afc-try-again"),
            try_again_timer = try_again.find("[data-validation-code-timer]");

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

        input_mobile_prefix.on("change", function (e) {
            var prefix = e.target.value;

            if (typeof prefix !== "string") {
                return;
            }

            user_mobile_prefix = prefix;
        });

        input_mobile_number.on("keyup", function (e) {
            var mobile = e.target.value;

            if (typeof mobile !== "string") {
                return;
            }

            if (mobile.length === 10) {
                user_mobile_suffix = mobile;
                btn_submit_mobile.removeClass("disable");
            } else {
                user_mobile_suffix = null;
                btn_submit_mobile.addClass("disable");
            }
        });

        btn_submit_mobile.on("click", function (e) {
            e.preventDefault();

            if (user_mobile_suffix === null) {
                return;
            }

            if (user_mobile_suffix.length !== 10) {
                return;
            }

            try_again.removeClass("active");

            var counter = try_again_time / 1000;
            var interval = setInterval(function () {
                counter--;
                try_again_timer.html(counter);
                if (counter == 0) {
                    try_again.addClass("active");
                    clearInterval(interval);
                }
            }, 1000);

            user_mobile_number = user_mobile_prefix + user_mobile_suffix;

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
                    } else {
                        if (typeof data.message !== "undefined") {
                            alert("data.message");
                        } else {
                            alert("شماره موبایل ارسال شده صحیح نمیباشد.");
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

            if (code.length >= 1 && code.length <= 10) {
                user_mobile_code = code;
                btn_submit_code.removeClass("disable");
            } else {
                user_mobile_code = null;
                btn_submit_code.addClass("disable");
            }
        });

        btn_submit_code.on("click", function (e) {
            e.preventDefault();

            if (user_mobile_code.length >= 1 && user_mobile_code <= 10) {
                return;
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
                        $("[data-auth-panel]").removeClass("active");
                        $("[data-auth-panel='3']").addClass("active");
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } else {
                        if (typeof data.message !== "undefined") {
                            alert("data.message");
                        } else {
                            alert("تایید کد با خطا مواجد شد. لطفا دوباره تلاش کنید شده صحیح نمیباشد.");
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

        $(".afc-try-again__button").on("click", function () {
            try_again_time = 3000;
            $("[data-validation-code-timer]").html(try_again_time / 1000);
            var counter = try_again_time / 1000;

            var interval = setInterval(function () {
                counter--;
                try_again_timer.html(counter);
                if (counter == 0) {
                    try_again.addClass("active");
                    clearInterval(interval);
                }
            }, 1000);
        });
    };

    $(window).on("load", function () {});

    $(document).ready(function () {
        AFRA.Select2_v2();
        AFRA.Stepper_v2();
        AFRA.Calendar_v2();
        AFRA.CalendarCarousel_v2();
        AFRA.CalendarSetSessions_v2();
        AFRA.RegisterForm_v2();

        $(".afc-selected-times__mobile__button").on("click", function () {
            var modal = $(this).siblings(".afc-selected-times__mobile__modal");
            modal.addClass("active");
        });
        $(".afc-selected-times__mobile__modal__close").on("click", function () {
            var modal = $(this).parent().parent(".afc-selected-times__mobile__modal");
            modal.removeClass("active");
        });
    });
})(jQuery);