'use strict';

var ioHandler = require('./ioHandler');

$(document).ready(function() {
    $('#typebox').val("CQ_LOGIN");
    $('#msgbox').val('{"user_id":10,"device":"test_chrome"}');

    ioHandler(8000);
});

