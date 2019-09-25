// NewIndex_interactive:首页交互，仅限于html&css，涉及到ajax的写在其他地方
$(function () {
    //加载后看500ms背景图再继续
    setTimeout(function () {
        $("#welcomebtn").show();
        $("#welcomebtn").addClass("layui-anim layui-anim-fadein");
    }, 500);
    setTimeout(function () {
        $("#weldiv").css("opacity", 0.25);
    }, 1500);
    //（效果）点击欢迎按钮后显示JDBC区
    $("#welcomebtn").click(function () {
        //加载配置文件（方法写在其他JS）
        loadProperties();
        //欢迎按钮消失、JDBC输入区展示
        $("#welcomebtn").addClass("layui-anim layui-anim-fadeout");//通过追加layui的class使得隐藏
        $("#welcomebtn").css("display", "none");
        $(".jdbczoon,#c1,#c2").show();//先从隐藏取消
        $(".jdbczoon,#c1,#c2").addClass("layui-anim layui-anim-scale");//平滑放大
        //此时才添加“鼠标移入移出/显示隐藏”的互动效果
        // （效果）jdbc输入区淡入淡出 start
        $(".jdbczoon").mouseover(function () {
            $("#c1,#c2").show();
            $("#c3").css("opacity", 0.85);//透明度
        });
        $(".jdbczoon").mouseleave(function () {
            $("#c1,#c2").css("display", "none");
            $("#c3").css("opacity", 0.25);//透明度
        });
    });

    //（效果）JSON校验网站弹出层
    $("button[title='JSON格式校验']").click(function () {
        layui.use('layer', function () {
            layer.confirm('打开？', {
                time: 2500, //20s后自动关闭
                btn: ['是的', '下次']
            }, function () {
                window.open("http://www.bejson.com/")
            }, function () {
            });
        });
    });
    //textarea清除
    $("#cleanJDBCtextarea").click(function () {
        $("#c2 textarea").val("");
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg("ALL Clear !!");
        });

    });

    //textarea重置
    $("#resetJDBCtextarea").click(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            var propertiesString = global_properties;//从全局变量读取
            if (propertiesString != null && propertiesString.trim() != "") {
                var proObj = JSON.parse(propertiesString);
                var basicjdbcString = proObj.basicjdbc;//拿到的是JSON格式的字符串
                if (basicjdbcString != null && basicjdbcString.trim() != "") {
                    fillJDBCtextarea(basicjdbcString);//调用其他JS的函数
                    layer.msg("已重置");
                } else {
                    layer.msg("已尝试重置，然而属性文件无相关内容");
                }
            } else {
                var exampleJDBC = "{\"url\":\"jdbc:mysql://139.129.67.219:3306/\",\"dbname\":\"zhstjj\",\"parameter\":\"?serverTimezone=UTC\",\"username\":\"zhsdevelop\",\"password\":\"southnet\",\"sql\":\"select * from channel\"}";
                fillJDBCtextarea(exampleJDBC);
                layer.tips('已使用示例配置', '#resetJDBCtextarea', {
                    tips: [4, '#564bba']
                });
            }
        });
    });

    //点击打开“探索服务器”的页面
    $("#showAllTables").click(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.open({
                type: 2,
                title: '探索服务器',
                shadeClose: true,
                shade: 0.8,
                area: ['90%', '90%'],
                content: '/iframeForShowAllTables', //iframe的url。Controller跳转
                success: function (layero, index) {
                    if (global_properties != null && global_properties.trim() != "") {
                        var proJSON = JSON.parse(global_properties);
                        var soString = proJSON.serviceInfo;//仍然是字符串
                        var soObj = JSON.parse(soString);//仅用于判断
                        if (soObj != null) {
                            var iframeBody = layer.getChildFrame('body', index);
                            iframeBody.find('#settings').val(soString);//信息往iframe传递
                        }
                    }
                }
            });
        });
    });


    $("#weldiv").mouseover(function () {
        $("#weldiv").css("opacity", 0.75);
    });
    $("#weldiv").mouseleave(function () {
        $("#weldiv").css("opacity", 0.25);
    });

    //预留了一组按钮，下版本可以扩展
    $("#nextTime button").click(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg("Hello World !");
        });
    });


//快速回到顶部功能按钮
    $("#back2top").click(function () {
        if ($('html').scrollTop()) {
            $('html').animate({scrollTop: 0}, 100);//动画效果
            return false;
        }
        $('body').animate({scrollTop: 0}, 100);
        return false;
    });
    //“快速回到顶部”的按钮出现和隐藏
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#back2top").fadeIn(800);
        } else {
            $("#back2top").fadeOut(1000);
        }
    });


});//end jquery

//为ajax发生请求时写的交互 N个
//（1）按钮禁用
function Submitdisable() {
    //参考 <i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop" id="treerequestloading">&#xe63d;</i>
    $("#connDB").addClass("layui-btn-disabled");//禁用
    $("#connDB").removeClass("layui-bg-blue");//去掉颜色
    $("#connDB>i").html("&#xe63d;");//换成加载的图标
    //追加循环旋转的css
    $("#connDB").addClass("layui-bg-black");//换颜色
    $("#connDB>i").addClass("layui-anim");
    $("#connDB>i").addClass("layui-anim-rotate");
    $("#connDB>i").addClass("layui-anim-loop");
}

//（2）恢复按钮原样
function Submitrestore() {
    $("#connDB").removeClass("layui-btn-disabled");//取消禁用
    $("#connDB").removeClass("layui-bg-black");//换颜色
    $("#connDB").addClass("layui-bg-blue");//换颜色
    $("#connDB>i").html("&#xe615;");//换成正常的图标
    // 去掉动画
    $("#connDB>i").removeClass("layui-anim");
    $("#connDB>i").removeClass("layui-anim-rotate");
    $("#connDB>i").removeClass("layui-anim-loop");
}

//(3)ajax执行成功时按钮的特殊提示
function submitdone() {
    $("#connDB>i").html("&#xe6c6;");//换成大拇指图标（&#xe6c6;）/钩（&#x1005;）
    // 去掉动画
    $("#connDB>i").removeClass("layui-anim");
    $("#connDB>i").removeClass("layui-anim-rotate");
    $("#connDB>i").removeClass("layui-anim-loop");
    $("#connDB").removeClass("layui-bg-black");//换颜色
    $("#connDB").addClass("layui-bg-orange");//换颜色
    //等待1秒后图标再恢复正常
    setTimeout('submitdone_I()', 1000);
}

function submitdone_I() {
    $("#connDB").removeClass("layui-bg-orange");//换颜色
    $("#connDB").addClass("layui-bg-blue");//换颜色
    $("#connDB>i").html("&#xe615;");//换成正常的图标
    $("#connDB").removeClass("layui-btn-disabled");//取消禁用
}


//显示
function barshow() {
    $("#layuiBar").show(function () {
        layui.use('element', function () {
            // 这里引用模块纯粹是为了让模块效果处来
            var element = layui.element;
        });
    });
}

//拉满
function barFull_I() {
    setTimeout("barFull_II()", 150);
    setTimeout("barFull_III()", 2000);
}

function barFull_II() {
    layui.use('element', function () {
        var element = layui.element;
        element.progress('demo', '100%');
    });
}

function barFull_III() {
    $("#layuiBar").fadeOut();
    layui.use('element', function () {
        var element = layui.element;
        element.progress('demo', '70%');
    });
    $("#layuiBar").css("display", "none");
}

//归零
function barZero() {
    setTimeout('barZero_I()', 300);
}

function barZero_I() {
    layui.use('element', function () {
        var element = layui.element;
        element.progress('demo', '0%');
    });
    $("#layuiBar").fadeOut(1000);
}


//为了解决窗口问题，将开窗抽方法
function openExplore() {

}