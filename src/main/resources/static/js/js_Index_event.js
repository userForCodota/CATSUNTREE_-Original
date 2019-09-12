$(function () {
    // 鼠标移入移出功能区事件
    $(".panel01").hover(function () {
        $("#JDBC_Info").show();
        $("#showPanel01").css("opacity", "1.0");//透明度
    }, function () {
        $("#JDBC_Info").hide();
        $("#showPanel01").css("opacity", "0.15");//透明度
    });
    $(".panel02").hover(function () {
        $("#treeProperties").show();
        $("#showPanel02").css("opacity", "1.0");//透明度
    }, function () {
        $("#treeProperties").hide();
        $("#showPanel02").css("opacity", "0.15");//透明度
    });
    var layer;
    layui.use('layer', function () {
        layer = layui.layer;
    });

    // 利用jquery的keyup()方法监测textarea的变化
    $('#JDBC_Info_Textarea').keyup(
        function () {
            var count = $(this).val().length;
            if (count == 0) {
                layer.msg("可点击重置按钮获取JSON示例");
            }
        });
    
    
    // 跳转JSON校验网站
    $("#jsonCheck").click(function () {
        window.open("http://www.bejson.com/");
    });
});