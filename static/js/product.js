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
            this.init_echarts();
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
        },
        init_echarts: function () {
            var set_bar_color = function (params) {
                var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                return colorList[params.dataIndex]
            }
            var option1 = {
                color: ['#3398DB'],
                title: {
                    text: 'QPS与表的行数的关系',
                    bottom: 0,
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70],
                    type: 'bar',
                    barWidth: 40,
                    itemStyle: {
                        normal: {
                            color: set_bar_color
                        }
                    }
                }]
            };
            var option2 = {
                color: ['#3398DB'],
                title: {
                    text: '延迟与表的行数的关系',
                    bottom: 0,
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70],
                    type: 'bar',
                    barWidth: 40,
                    itemStyle: {
                        normal: {
                            color: set_bar_color
                        }
                    }
                }]
            };
            var myChart1 = echarts.init(document.getElementById('main1'));
            var myChart2 = echarts.init(document.getElementById('main2'));
            myChart1.setOption(option1);
            myChart2.setOption(option2);
        }
    }
    product.init();
});