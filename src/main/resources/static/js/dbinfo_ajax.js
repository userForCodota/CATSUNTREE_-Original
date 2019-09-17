// 读取配置文件或者用户输入的服务器信息，以查询所有的数据库和表信息
$(function () {
    //select框值发生改变事件
    layui.use('form', function () {
        var formDBInfo = layui.form;
        formDBInfo.on('select(selectdb)', function (data) {
            console.log(data.elem); //得到select原始DOM对象
            console.log(data.value); //得到被选中的值
            console.log(data.othis); //得到美化后的DOM对象
        });
    });
});