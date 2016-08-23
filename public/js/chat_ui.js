function divEs(message) {
    return $('<div style="color: blueviolet"></div>').text('YOU say: '+message)
}
function divSy(message) {
    return $('<div></div>').html('<i>' + message + '</i>')
}

function userInput(chatApp, socket) {
    var $message = $('#messages');
    var s = $('#send-message');
    var message = s.val();
    var sysM;
    if (message.charAt(0) == '/') {
        sysM = chatApp.command(message);
        if (sysM) {
            $message.append(divSy(sysM));
        }
    } else {
        chatApp.sendMessage($('#room').text(), message);
        $message.append(divEs(message));
        $message.scrollTop($message.prop('scrollHeight'))
    }
    s.val('')
}


var socket = io.connect();
$(document).ready(function () {
    var chatApp = new Chat(socket);
    socket.on('nameResult', function (res) {
        var m;
        if (res.success) {
            m = ' You are now konwn as ' + res.name + '.'
        } else {
            m = res.message
        }
        $('#messages').append(divSy(m))
    });
    socket.on('joinResult', function (res) {
        $('#room').text(res.room);
        $('#messages').append(divSy('Room changed.'))
    });
    socket.on('message', function (m) {
        var newN = $('<div></div>').text(m.text);
        $('#messages').append(newN)
    });
    socket.on('rooms', function (rooms) {
        $('#room-list').empty();
        for (var room in rooms) {
            room = room.substring((1, room.length));
            if (room != '') {
                $('#room-list').append(divEs(room))
            }
        }
        $('#room-list div').click(function () {
            chatApp.command('/join ' + $(this).text());
            $('#send-message').focus();
        })
    });
    setInterval(function () {
        socket.emit('rooms')
    }, 1000);
    $('#send-message').focus();
    $('#send-button').click(function(){
        userInput(chatApp, socket);
        return false
    })
    $(document).on('keyup',function(e){
        if(e.keyCode==13 && $('#send-message').val()!==''){
            userInput(chatApp, socket);
        }
    })
    
    
    
});














