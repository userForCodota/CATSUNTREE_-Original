$(function () {

});//end jquery
//##############################################################################################################################
//种树总控。提醒信息等扩展功能写在子函数，本方法不做展开。
//参数data：json对象。包含状态码、列名数组、表数据、列数和msg信息
function treeBuildAllStart(data) {
    if (checkStatusAndColumncount(data)) {
    }
}

//##############################################################################################################################

// 检查状态码和列数是否满足条件，return true/false
function checkStatusAndColumncount(data) {
    if (data.status == "1") {
        try {
            var ccc = data.columncount;
            if (parseInt(ccc) >= 3) {
                return true;
            } else {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.alert(("列数至少三列才能构造栏木树。当前数据columncount=" + ccc), {
                        skin: 'layui-layer-molv' //样式类名
                        , closeBtn: 0
                    });
                });
            }
        } catch (e) {
            //数字字符串无法解析成数字
            console.log(e);
        }
    } else {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.alert((data.msg + "&#13;完整信息可查看控制台"), {
                skin: 'layui-layer-molv' //样式类名
                , closeBtn: 0
            });
        });
    }
    return false;
}