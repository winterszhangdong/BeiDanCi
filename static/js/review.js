if(!window.localStorage) {
    alert("你的浏览器太土了，不支持本高大上的app，请换用chrome，firefox或IE8以上的浏览器!");
    alert("所以你用不了...");
}

$(document).ready(function(){
    //检查本地储存中是否有new_words字段
    if (window.localStorage.getItem("new_words")) {
        var new_words = JSON.parse(localStorage.getItem("new_words"));
    } else {
        localStorage.setItem("new_words", "");
        var new_words = [];
    }

    var lessons = [];
    var selected_lessons = [];
    var word;

    function selectLessons() {
        // var selected = word_list.slice(start, end);
        for (var i = 0; i < selected_lessons.length; i++) {
            var index = selected_lessons[i];
            var lesson_words = word_list[index]["word_list"];
            lessons = lessons.concat(lesson_words);
        }
        // for (var i in selected) {
        //     lessons = lessons.concat(selected[i]["word_list"]);
        // }
    }

    //从词汇表中随机挑选一个词
    function selectWord() {
        if (lessons.length) {
            var index = Math.floor(Math.random() * lessons.length);
            var selected_word = lessons[index];
            lessons.splice(index, 1);   
            return selected_word;
        } else {
            // alert("Congratulations! You have reviewed all the words!");
            return false;
        }
    }

    //检查可遍历对象中是否有给定元素
    function search(item, list) {
        for (var i in list) {
            if (item === list[i]) {
                return true;
            }
        }
        return false;
    }

    //从生词表中随机挑选一个词
    function selectFormNewWords() {
        var index = Math.floor(Math.random() * new_words.length);
        return new_words[index];
    }


    // selectLessons(5, 13);


    // 初始化iCheck插件
    $('input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris',
        increaseArea: '-10' // optional
    });   

    // 全选或反选所有课程
    $("#selectall>a").click(function() {
        $(".lesson_checkbox").iCheck('toggle');
    });

    // 提交所选的课程
    $("#submit_lesson>a").click(function () {
        var checkboxs = $(".lesson_checkbox");
        var i;
        for (i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].checked) {
                selected_lessons.push(i);
            }
        }

        console.log(selected_lessons);

        if (selected_lessons.length != 0) {
            selectLessons();

            $("#lesson").fadeOut("fast", function() {
                $("#review").fadeIn("fast");
            });
            $("#count").html(lessons.length);

            word = selectWord()
            console.log(word);
            $("#word").html(word["word"]);
            $("#pronunciation").html([word["pronunciation"], word["accent"]].join("--- "));
            $("#meaning").html(word["meaning"]);
            $("#type").html(word["type"]);
            $("#count").html(lessons.length);

            $(".mask").hide();
        } else {
            alert("请选择要背单词的课程");
        }
    });

    $("#next").click(function () {
        word = selectWord();

        if(!word) {
            if_again = confirm("这些单词你已经背了一遍了，还要再背一遍吗？");
            if(if_again) {
                selectLessons();
                word = selectWord() 
            } else {
                window.location.reload();
            }
        }

        console.log(word);
        $("#word").html(word["word"]);
        $("#pronunciation").html([word["pronunciation"], word["accent"]].join("--- "));
        $("#meaning").html(word["meaning"]);
        $("#type").html(word["type"]);
        $("#count").html(lessons.length);

        $(".mask").hide();
    });

    $("#show").click(function() {
        $(".mask").fadeIn("fast");
    });

    $("#add").click(function() {
        if (search(word, new_words)) {
            alert("You have already added this word!");
        } else if (word) {
            new_words.push(word);
            localStorage.setItem("new_words", JSON.stringify(new_words));
            // alert(localStorage.word_list);
        }
    });

});