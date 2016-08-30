define(function (require) {
    var $ = require('jquery');
    var keyBoard = require('keyBoard');

    var start = function () {
        $('#pay_btn').click(function () {
            keyBoard({
                href: '#',
                remote: {
                    url: '/login',
                    data: {
                        name: '123'
                    }
                }
            });
        });
    };

    return {
        start: start
    }
});