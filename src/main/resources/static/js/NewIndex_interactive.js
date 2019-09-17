// NewIndex_interactive:首页交互，仅限于html&css，涉及到ajax的写在其他地方
$(function () {
    // （效果）jdbc输入区淡入淡出 start
    $(".jdbczoon").mouseover(function () {
        $("#c1,#c2").fadeIn();
        $("#c3").css("opacity", 1.0);//透明度
    });
    $(".jdbczoon").mouseleave(function () {
        $("#c1,#c2").fadeOut();
        $("#c3").css("opacity", 0.25);//透明度
    });
    //（效果）JSON校验网站弹出层
    $("button[title='JSON格式校验']").click(function () {
        window.open("http://www.bejson.com/");
    });
    //textarea清除
    $("#cleanJDBCtextarea").click(function () {
        var layer;
        layui.use('layer', function () {
            layer = layui.layer;
        });
        $("#c2 textarea").val("");
        layer.msg("已清空");
    });
    //点击打开“展示所有数据库和表信息”的页面
    $("#showAllTables").click(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.open({
                type: 2,
                title: '查看所有的数据库和表格',
                shadeClose: true,
                shade: 0.8,
                area: ['85%', '85%'],
                content: '/dbinfo' //iframe的url
            });
        });
    });
});