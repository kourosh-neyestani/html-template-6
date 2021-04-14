(function ($) {
    $.fn.digits = function () {
        return this.each(function () {
            $(this).text(
                $(this)
                    .text()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            );
        });
    };

    /*====== Admin: Tabs ======*/
    AFRA.Admin_Tabs = function () {
        var link = $("[data-admin-tab-link]");

        link.on("click", function () {
            var data = $(this).data("admin-tab-link");
            var content = $("[data-admin-tab-content='" + data + "']");

            if (!$(this).hasClass("active")) {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                $("[data-admin-tab-content]").removeClass("active");
                content.addClass("active");
            }

            if (data === "all") {
                $("[data-admin-tab-content]").addClass("active");
            }
        });
    };

    /*====== Admin: Pricing ======*/
    AFRA.Admin_Pricing = function () {
        var selector = $("[data-admin-select-price]").find(".el-select2");

        if (!selector.length) {
            return;
        }

        selector.on("change", function (e) {
            var output,
                selected = e.target.value,
                parent_id = $(this).parent().parent().parent().data("admin-select-price"),
                calculate = $(this).parent().parent().parent().siblings("[data-admin-calculate-price]");

            output = selected * calculate.data("admin-calculate-price");

            if (typeof output === "number") {
                calculate.find(".output").text(output).digits();
                if (parent_id === 0) {
                    $("[data-admin-calculate-price-id='0']")
                        .text(selected - (selected * 20) / 100)
                        .digits();
                } else {
                    $("[data-admin-calculate-price-id='" + parent_id + "']")
                        .text(output - (output * 20) / 100)
                        .digits();
                }
            } else {
                calculate.find(".output").text(0);
            }
        });
    };

    /*====== Admin: Pricing ======*/
    AFRA.Admin_Pricing_2 = function () {
        var price = 0,
            percent = 20,
            input = $("[data-admin-select-price-2]").find("input"),
            selector = $("[data-admin-select-price-2]").find(".el-select2");

        function calc(x, y) {
            x = parseInt(x);
            y = parseInt(y);

            if (!x) {
                return 0;
            }

            z = (x * y) / 100;
            return z;
        }

        input.on("input", function (e) {
            var value = parseInt(e.target.value);
            if (!value) {
                price = 0;
                $(".select2-selection__rendered").text(0);
                selector.prop("disabled", true);
                $("[data-admin-calculate-price-2]").find(".output").text(0);
                $("[data-admin-calculate-price-id-2='1'], [data-admin-calculate-price-id-2='5'], [data-admin-calculate-price-id-2='10']").text(0);
                return;
            } else {
                selector.prop("disabled", false);
            }
            price = value;
            var p = value + calc(value, percent);
            $("[data-admin-calculate-price-2='1']").find(".output").text(p).digits();
            $("[data-admin-calculate-price-2='5']")
                .find(".output")
                .text(5 * p)
                .digits();
            $("[data-admin-calculate-price-2='10']")
                .find(".output")
                .text(10 * p)
                .digits();
            $("[data-admin-calculate-price-id-2='1']").text(value).digits();
            $("[data-admin-calculate-price-id-2='5']")
                .text(value * 5)
                .digits();
            $("[data-admin-calculate-price-id-2='10']")
                .text(value * 10)
                .digits();
        });

        selector.on("change", function (e) {
            var v = parseInt(e.target.value),
                d = $(this).parent().parent().parent().data("admin-select-price-2");

            if (d === 5) {
                var p = 5 * (price + calc(price, percent)),
                    q = calc(p, v),
                    o = p - q;

                $("[data-admin-calculate-price-2='5']").find(".output").text(o).digits();
                $("[data-admin-calculate-price-id-2='5']")
                    .text(price * 5 - calc(price * 5, v))
                    .digits();
            } else if (d === 10) {
                var p = 10 * (price + calc(price, percent)),
                    q = calc(p, v),
                    o = p - q;

                $("[data-admin-calculate-price-2='10']").find(".output").text(o).digits();
                $("[data-admin-calculate-price-id-2='10']")
                    .text(price * 10 - calc(price * 10, v))
                    .digits();
            }
        });
    };

    /*====== Admin: Pricing ======*/
    AFRA.Admin_Pricing_3 = function () {
        
        // Get Data
        var input_01session = $(".admin-pricing__get--01"),
            input_05session = $(".admin-pricing__get--05").find("select"),
            input_10session = $(".admin-pricing__get--10").find("select"),
            input_trial_session = $(".admin-pricing__get--trial").find("select");

        var fees = parseInt($(".admin-panel--pricing").data("pricing-fees")),
            trial = input_trial_session.val() || 0, 
            price = input_01session.val() || 0,       
            discount_05 = input_05session.val() || 0, 
            discount_10 = input_10session.val() || 0,
            format = wNumb({
                thousand: ",",
                decimals: 0,
            });
        
        // Get Final-Price
        function get_final_price(count, discount = 0, new_fees = fees, new_price = price) {

            var bf = count * new_price;

            if (discount !== 0) {
                bf = bf - ((bf * discount) / 100);
            }

            if (new_fees !== 0) {
                var af = (bf * new_fees) / 100;
                var bf = bf + af;
            }

            return format.to(bf);
        }

        function print() {
            // Final-Price with fees.
            $(".final-income--01session").text(get_final_price(1, 0));
            $(".final-income--05session").text(get_final_price(5, discount_05));
            $(".final-income--10session").text(get_final_price(10, discount_10));

            // Teacher's salary.
            $(".teacher-income--01session").text(get_final_price(1, 0, 0));
            $(".teacher-income--05session").text(get_final_price(5, discount_05, 0));
            $(".teacher-income--10session").text(get_final_price(10, discount_10, 0));
        }

        print();

        input_01session.on("input", function(e) {
            var value = parseInt(e.target.value);
            price = value;

            if (!isNaN(value)) {
                print();
            } else {
                price = 0;
                print();
            }
        })

        input_05session.on("change", function (e) {
            var value = parseInt(e.target.value);
            discount_05 = value;

            if (!isNaN(value)) {
                print();
            } else {
                discount_05 = 0;
                print();
            }
        })
        
        input_10session.on("change", function (e) {
            var value = parseInt(e.target.value);
            discount_10 = value;

            if (!isNaN(value)) {
                print();
            } else {
                discount_10 = 0;
                print();
            }
        })

        // Echo Trial
        if (trial === 0) {
            $(".teacher-income--trial").text("رایگان");
            $(".teacher-income--trial").addClass("text-danger");
            $(".teacher-income--trial--text").hide();
        } else {
            $(".teacher-income--trial").text(get_final_price(1, 0, -fees, trial));     
        }

        input_trial_session.on("change", function (e) {
            var value = parseInt(e.target.value);
            
            if (!isNaN(value) && value !== 0) {
                $(".teacher-income--trial").removeClass("text-danger");
                $(".teacher-income--trial").text(get_final_price(1, 0, -fees, value));        
                $(".teacher-income--trial--text").show();
            } else {
                $(".teacher-income--trial").text("رایگان");
                $(".teacher-income--trial").addClass("text-danger");
                $(".teacher-income--trial--text").hide();
            }
        })
        
        // Set Fees
        $(".admin-pricing__set--fees").text(fees);
        
    }

    /*====== Admin: Multi_Checkboxes ======*/
    AFRA.Admin_Multi_Checkboxes = function () {
        var i = 0,
            el = $(".form-item--multi-checkbox"),
            limit = el.data("limit-checkboxes"),
            input = el.find("input");

        // if (input.is(":checked")) {
        //     input.prop("checked", false);
        //     input.parent("li").removeClass("active");
        // }

        input.on("click", function (e) {
            var li = $(this).parent();

            if (i >= limit) {
                return;
            }

            if ($(this).is(":checked")) {
                i++;
                li.addClass("active");
                $(this).prop("checked", true);
            } else {
                i--;
                li.removeClass("active");
                $(this).prop("checked", false);
            }
        });
    };

    AFRA.Add_To_Clipboard = function () {
        var input = $("<input>");
        $("body").append(input);
        input.val($(element).text()).select();
        document.execCommand("copy");
        input.remove();
    };

    $(document).ready(function () {
        AFRA.Admin_Tabs();
        // AFRA.Admin_Pricing();
        // AFRA.Admin_Pricing_2();
        AFRA.Admin_Pricing_3();
        AFRA.Admin_Multi_Checkboxes();
    });
})(jQuery);
