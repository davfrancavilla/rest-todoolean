$(document).ready(function(){

getList();





$("#list").on("click", "i",function(){
    var id = $(this).parent().attr("data-id");
    deleteItem(id);
})


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