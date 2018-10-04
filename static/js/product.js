$(function () {
    var product = {
        product_info: {
            product: 'VIRTUAL_MACHINE'
        },
        init: function () {
            // 滑动条默认参数
            var option_default = {
                from: 0,
                to: 100,
                step: 1,
                format: '%s',
                width: 300,
                theme: 'theme-blue',
                showLabels: false,
                isRange : true
            }
            this.init_rang(option_default);
            this.switch_tab();
            this.submit();
            this.fold_panel();
        },
        init_rang: function (option) {
            var _this = this;
            // 初始化滑动条
            var options = {
                onstatechange: function (val) {
                    var val = val.substring(val.indexOf(',') + 1, val.length)
                    if (this.inputNode[0].id === 'rangeSliderConnect') {
                        $('.connect-value span').text(val);
                        _this.product_info.connect_value = val;
                    } else {
                        $('.save-value span').text(val);
                        _this.product_info.save_value = val;
                    }
                }
            }
            options = $.extend({}, option, options);
            $('#rangeSliderConnect').jRange(options);
            $('#rangeSliderSave').jRange(options);
        },
        switch_tab: function () {
            // 左侧切换tab
            var _this = this;
            $('.tab-list').on('click', '.tab-item', function () {
                var index = $(this).index();
                var opt = {
                    min: 0
                };
                var product = $(this).attr('data-type');
                _this.product_info.product = product;
                $(this).addClass('current').siblings().removeClass('current');
                switch (index) {
                    case 0:
                        opt.max = 101;
                        break;
                    case 1:
                        opt.max = 102;
                        break;
                    case 2:
                        opt.max = 103;
                        break;
                    case 3:
                        opt.max = 104;
                        break;
                }
                _this.set_range(opt);
            })
        },
        set_range: function (opt) {
            // 设置rang
            $('#rangeSliderConnect').jRange('updateRange', opt.min + ',' + opt.max);
            $('#rangeSliderConnect').jRange('updateRender', [opt.min, opt.max]);
            $('#rangeSliderSave').jRange('updateRange', opt.min + ',' + opt.max);
            $('#rangeSliderSave').jRange('updateRender', [opt.min, opt.max]);
        },
        get_product_info: function () {
            // 获取选取的产品信息
            var _this = this;
            $('.pay-way').each(function (index, item) {
                if ($(this).is(":checked")) {
                    _this.product_info.pay_way = $(this).attr('data-way');
                }
            })
            return this.product_info;
        },
        submit: function () {
            // 提交按钮
            var _this = this;
            $('.tab-content-list').on('click', '.submit-button', function () {
                var data = _this.get_product_info();
                $.ajax({
                    type: 'POST',
                    url: '/',
                    data: data,
                    success: function (data) {
                        // 请求成功的代码
                    }
                });
            });
        },
        fold_panel: function () {
            // 右侧折叠板块
            $('.product-info-title').click(function () {
                var _this = $(this);
                if ($(this).hasClass('current')) {
                    $(this).parents('.product-info-item').find('.product-info-content').animate({'height': '0'}, 200, function () {
                        _this.removeClass('current');
                    });
                } else {
                    $(this).parents('.product-info-item').find('.product-info-content').animate({'height': '200px'}, 200, function () {
                        _this.addClass('current');
                    });
                    $(this).parents('.product-info-item').siblings('.product-info-item').find('.product-info-content').animate({'height': '0'}, 200, function () {
                        $(this).parents('.product-info-item').find('.product-info-title').removeClass('current');
                    });
                }
            });
        }
    }
    product.init();
});