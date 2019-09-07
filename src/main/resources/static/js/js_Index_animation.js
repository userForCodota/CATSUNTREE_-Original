$(function () {
    // 加载form模块
    var form;
    layui.use('form', function () {
        form = layui.form;
    });

    $("#btn01").click(function () {
        $('#bgPic').fadeOut(500);
        $('#btn01').fadeOut(500);
    });
});