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

            console.log($(this));

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

            console.log(i);
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
        AFRA.Admin_Pricing();
        AFRA.Admin_Multi_Checkboxes();
    });
})(jQuery);
