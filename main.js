var nolik = "⭕";
var krestik = "❌";

const board = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
};

const stack = [];

var go = false;

function checkGameOver() { 
    // go - game over
    
    //check rows
    for (let i = 1; i<10; i=i+3) {
        s = board[i];
        if (s != "") {
            if (s===board[i+1] && s===board[i+2]) {
                go = true;
            }
        }
    }

    //check columns
    for (let i = 1; i<4; i=i+1) {
        s = board[i];
        if (s != "") {
            if (s===board[i+3] && s===board[i+6]) {
                go = true;
            }
        }
    }

    // check diagonals
    s = board[1];
    if (s != "" && board[3] != "") {
        if (board[1]===board[5] && board[1]===board[9]) { go = true; }
        if (board[3]===board[5] && board[3]===board[7]) { go = true; }
    }


    if (go) {
        last = stack[stack.length-1]
        
        if (last===krestik) {
            //alert('2 won');
            $('#mon').text('Игрок 1 победил!');
        } else {
            //alert('1 won');
            $('#mon').text('Игрок 2 победил!');
        }
    }
 } 

$(document).ready(function () {
    $('.de').click(function (e) { 
        e.preventDefault();
        alert('bebr');
    });

    $('.box').mouseup(function (e) { 
        if (go) return;
        //alert($(this).text())
        _val = $(this).text();
        _id = $(this).attr('id');
        //$(this).text(krestik);
        
        
        if (_val==="") {
            const last = stack.pop();
            stack.push(last)
            if (stack.length===0) {
                new_val = krestik
            } else {
                if (last===krestik) {new_val = nolik; }
                else {new_val = krestik; }
            }
            $(this).text(new_val);
            stack.push(new_val);
            const _id = parseInt($(this).attr("id"));

            board[_id] = new_val;
            //$('#mon').text(board)


            // класс цвета для списка истории
            if (new_val === krestik) {
                cclass = "pinkc";
            } else {
                cclass = "yellowc";
            }

            // класс для заголовка(объявляет кто ходит)
            if (new_val === krestik) {
                $('#mon').text('Ход второго игрока');
            } else {
                $('#mon').text('Ход первого игрока');
            }

            checkGameOver();
            if (go===true) {
                cclass = "victory";
                li = "<li class=\"step "+ cclass + "\">" + (stack.length-1) + ". 🏆" + new_val + "</li>"
            } else {
                li = "<li class=\"step "+ cclass + "\">" + (stack.length-1) + ". " + new_val + "</li>"
            }
            $('.list').append(li);



            
            //console.log(board)
            


        }
        
        
        
        
    });

    $('.test').click(function (e) { 
        e.preventDefault();
        alert($(this).text())
        
    });
});