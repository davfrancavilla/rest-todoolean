$(document).ready(function(){

getList();


$("#addElement").on("click", function () {
    var elementName = $("input").val();
    $("input").val("");
    addItem(elementName);
})

$("#element-name").keydown(function (event) {
    if (event.which == 13 || event.keyCode == 13) {
        var elementName = $("input").val();
        $("input").val("");
        addItem(elementName);
    }
});

$("#element-name").click(function(){
    $("#list input").remove();
    $("#list span").show();
})

$("#list").on("click", "i", function () {
    var id = $(this).parent().attr("data-id");
    deleteItem(id);
})

$("#list").on("click", "span", function () {
    $("#list input").remove();
    $("#list span").show();

    var name = $(this).text();
    $(this).hide();
    var source = $("#editor-template").html();
    var template = Handlebars.compile(source);
    var obj = {
        text : name
    }
    var html = template(obj);
    $(this).parent().prepend(html);
})



$("#list").on("keydown", "input", function (e) {
    if (event.which == 13 || event.keyCode == 13) {
        var id = $(this).parent().attr("data-id");
        var name = $(this).val();
        editElement(id,name)
    }
});





function editElement(id,name) {
    
    $.ajax({
        url: "http://157.230.17.132:3012/todos/"+id,
        method: "PATCH",
        data: {
            text: name
        },
        success: function () {
            getList();
        },
        error: function (error) {
            alert(error);
        }
    });
}





function addItem(name){
    $.ajax({
        url: "http://157.230.17.132:3012/todos",
        method : "POST",
        data : {
            text : name
        },
        success: function () {
            getList();
        },
        error: function (error) {
            alert(error);
        }
    });
}


function deleteItem(id){
    $.ajax({
        url: "http://157.230.17.132:3012/todos/"+id,
        method: "DELETE",
        success: function () {
            getList();
        },
        error: function (error) {
            alert(error);
        }
    });
}

function getList(){
    $("#list").empty();
    var source = $("#template").html();
    var template = Handlebars.compile(source);
    $.ajax({
        url: "http://157.230.17.132:3012/todos",
        method: "GET",
        success: function (packet) {
            for (var i=0; i<packet.length; i++){
                var obj = {
                    id : packet[i].id,
                    element : packet[i].text
                }
                var html = template(obj);
                $("#list").append(html);
            }
        },
        error: function (error) {
            alert(error);
        }
    });

}

    



})