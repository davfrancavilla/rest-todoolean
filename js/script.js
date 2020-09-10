$(document).ready(function () {
  getList();

  $("#addElement").on("click", function () {
    addItem();
  });

  $("#element-name").keydown(function (event) {
    if (event.which == 13 || event.keyCode == 13) {
      addItem();
    }
  });

  $("#element-name").click(function () {
    resetInput();
  });

  $("#list").on("click", "i", function () {
    var id = $(this).parent().attr("data-id");
    deleteItem(id);
  });

  $("#list").on("click", "span", function () {
    resetInput();
    var name = $(this).text();
    $(this).hide();
    var source = $("#editor-template").html();
    var template = Handlebars.compile(source);
    var obj = {
      text: name,
    };
    var html = template(obj);
    $(this).parent().prepend(html);
    $("#list input").focus();
  });

  $("#list").on("blur", "input", function () {
    resetInput();
  });

  $("#list").on("keydown", "input", function (e) {
    if (event.which == 13 || event.keyCode == 13) {
      var id = $(this).parent().attr("data-id");
      var name = $(this).val();
      editElement(id, name);
    }
  });

  function resetInput(){
    $("#list input").remove();
    $("#list span").show();
  }

  function editElement(id, name) {
    $.ajax({
      url: "http://157.230.17.132:3012/todos/" + id,
      method: "PATCH",
      data: {
        text: name,
      },
      success: function () {
        getList();
      },
      error: function (error) {
        alert(error);
      },
    });
  }

  function addItem() {
    var elementName = $("input").val();
    if (elementName != "") {
      $("input").val("");
      $.ajax({
        url: "http://157.230.17.132:3012/todos",
        method: "POST",
        data: {
          text: elementName,
        },
        success: function () {
          getList();
        },
        error: function (error) {
          alert(error);
        },
      });
    }
  }

  function deleteItem(id) {
    $.ajax({
      url: "http://157.230.17.132:3012/todos/" + id,
      method: "DELETE",
      success: function () {
        getList();
      },
      error: function (error) {
        alert(error);
      },
    });
  }

  function getList() {
    $("#list").empty();
    var source = $("#template").html();
    var template = Handlebars.compile(source);
    $.ajax({
      url: "http://157.230.17.132:3012/todos",
      method: "GET",
      success: function (packet) {
        for (var i = 0; i < packet.length; i++) {
          var obj = {
            id: packet[i].id,
            element: packet[i].text,
          };
          var html = template(obj);
          $("#list").append(html);
        }
      },
      error: function (error) {
        alert(error);
      },
    });
  }
});
