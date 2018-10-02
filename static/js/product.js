$(function () {
    var product = {
        init: function () {
            this.init_rang();
        },
        init_rang: function () {
            $('.range-slider').jRange({
                from: 0,
                to: 100,
                step: 1,
                format: '%s',
                width: 300,
                theme: 'theme-blue',
                showLabels: false,
                isRange : true,
                onstatechange: function (val) {
                    console.log(val)
                    var val = val.substring(val.indexOf(',') + 1, val.length)
                    $('.connect-value').text(val);
                }
            });
        }
    }
    product.init();
});