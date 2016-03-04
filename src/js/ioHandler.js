const io = require('socket.io');
var socket = null;


function init(port) {
    socket = io.connect('http://localhost:' + port);

    socket.on('SA_LOGIN', function(data){
        $('#hello').append(data.result + " " + data.message + "<br/>");
    });

    $('#msgbox').keyup(function(event){
        if(event.keyCode == 13) {
            var type = $('#typebox').val();
            var msg = $('#msgbox').val();

            socket.emit(type, msg);
        }
    });
}

module.exports = init;