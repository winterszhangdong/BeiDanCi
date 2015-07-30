// 我勒个擦！特么的IE居然不支持本地的localStorage，必须要在有服务器端的条件下才行！
// 坑死了！
// 
// if (window.localStorage) {
//     alert("sopport localStorage");
// } else {
//     alert("not support localStorage");
// }

//检查本地储存中是否有new_words字段
if (localStorage.getItem("new_words") && JSON.parse(localStorage.getItem("new_words")).length) {
    var new_words = JSON.parse(localStorage.getItem("new_words"));
} else {
    alert("You have no new words!");
    location.href = "index.html";
}

//从生词表中随机挑选一个词
function selectFormNewWords() {
    if (new_words.length) {
        var index = Math.floor(Math.random() * new_words.length);
        var selected_word = new_words[index];
        new_words.splice(index, 1);
        return selected_word;
        // localStorage.setItem("new_words", new_words.splice(index, index));
    } else {
        new_words_again = confirm("恭喜！生词表里的单词已经复习了一遍，还要再复习一遍吗？");
        if(new_words_again) {
            window.location.reload();
        } else {
            location.href = "index.html";
        }
    }
}

function deleteFromNewWords(word) {
    var handleWords = JSON.parse(localStorage.getItem("new_words"));
    var i;
    for (i = 0; i < handleWords.length; i++) {
        // 这里为什么不能直接判断word跟handleWords[i]是否相等？
        if (word["word"] === handleWords[i]["word"]) {
            handleWords.splice(i,1);
            break;
        }
    }
    localStorage.setItem("new_words", JSON.stringify(handleWords));
}


$(document).ready(function() {
    var word;
    $("#count").html(new_words.length);

    $("#next").click(function () {
        word = selectFormNewWords(); 
        $("#word").html(word["word"]);
        $("#pronunciation").html([word["pronunciation"], word["accent"]].join("--- "));
        $("#meaning").html(word["meaning"]);
        $("#type").html(word["type"]);
        $("#count").html(new_words.length);

        $(".mask").hide();
    });

    $("#show").click(function() {
        $(".mask").fadeIn("fast");
    });

    $("#delete").click(function() {
        deleteFromNewWords(word);
    });
})