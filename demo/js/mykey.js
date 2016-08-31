define(function (require) {
    var $ = require('jquery');
    var keyBoard = require('keyBoard');

    var start = function () {
        $('#pay_btn').click(function () {
            keyBoard({
                href: '#',
                name: 'payPwd',
                remote: {
                    url: 'mock/test.json',
                    type: "post",
                    data: {
                        name: '123',
                        age: 24
                    }
                }
            });
        });
    };

    return {
        start: start
    }
});