$(function () {
    //zree按钮事件
    // 按钮组功能事件
    $("#tree1_ExpandAll").click(function () {
        var zTreeObj = $.fn.zTree.getZTreeObj("treemain");
        if (zTreeObj != null) {
            zTreeObj.expandAll(true);//展开全部
        }
    });
    $("#tree1_closeAll").click(function () {
        var zTreeObj = $.fn.zTree.getZTreeObj("treemain");
        if (zTreeObj != null) {
            zTreeObj.expandAll(false);//收起全部
        }
    });
    $("#tree1_showCid").click(function () {
        // changeNodeDisplayName();//重新决定节点的名称展示哪些内容
        // layui.use('layer', function () {
        //     var layer = layui.layer;
        //     layer.tips('暂未开放，请留意后续版本', '#tree1_showCid');
        // });
        var newlist = cnameWithCid(JSON.parse(datas.list));
        $.fn.zTree.destroy("treemain");//销毁 #treemain 的 zTree
        $.fn.zTree.init($("#treemain"), currentMainTreeSetting, newlist);//树重新初始化
    });
    $("#tree1_init").click(function () {
        if (datas == null) {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.tips('最近并没有种树', '#tree1_init');
            });
            return;
        }
        $.fn.zTree.init($("#treemain"), currentMainTreeSetting, JSON.parse(datas.list));//树重新初始化
    });
    $("#tree1_ext4").click(function () {
        $.fn.zTree.destroy("treemain");//销毁 #treemain 的 zTree
    });

});//end jquery
//##############################################################################################################################
//种树总控。提醒信息等扩展功能写在子函数，本方法不做展开。
//参数data：json对象。包含状态码、列名数组、表数据、列数和msg信息
function treeBuildAllStart(isFirst, data, customInput) {
    if (checkStatusAndColumncount(data)) {
        currentMainTreeSetting = assemblySettings(isFirst, data.tablename, customInput);
        //种树
        $.fn.zTree.init($("#treemain"), currentMainTreeSetting, JSON.parse(data.list));
    }
}

//##############################################################################################################################

// 检查状态码和列数是否满足条件，return true/false
function checkStatusAndColumncount(data) {
    if (data.status == "1") {
        try {
            var ccc = data.columncount;
            if (parseInt(ccc) >= 3) {
                return true;//满足要求
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

//组装栏目树所需的配置，根据配置文件或者用户输入的信息进行组装
// isFirst:是否是读取数据库后的首次自动加载
// data:用于提取表名，与属性文件进行对照
function assemblySettings(isFirst, queryname, customInput) {
    var targetCid;
    var targetPcid;
    var targetCname;
    var settingsAfterAssembly;
    if (isFirst) {
        //如果是首次则读取属性文件
        var global_propertiesJSON = JSON.parse(global_properties);
        var treeBasicElementString = global_propertiesJSON.treeBasicElement;//拿到json数组
        var treeBasicElement = JSON.parse(treeBasicElementString);
        var hadSetProperties = false;//是否在属性文件中指定了对应表的cid/pcid/cname
        for (var i = 0; i < treeBasicElement.length; i++) {
            if (treeBasicElement[i].tablename == queryname) {
                targetCid = treeBasicElement[i].cid;
                targetPcid = treeBasicElement[i].pcid;
                targetCname = treeBasicElement[i].cname;
                hadSetProperties = true;
                break;
            }
        }
        //根据flag判断是否需要用户手动输入指定cid/pcid/cname
        if (hadSetProperties) {
            //已配置，继续往下执行代码。
        } else {
            //尚未配置，此时需要跳出方法，调用界面让用户指定。
            customChooseSettings();
            return;
        }
    } else {
        //通过读取用户选定的来组装
        targetCid = customInput.cid;
        targetPcid = customInput.pcid;
        targetCname = customInput.cname;
    }
    //开始组装
    settingsAfterAssembly = {
        "async": {"enable": false},
        "check": {"enable": false, "autoCheckTrigger": true},
        "data": {"simpleData": {"enable": true, "idKey": targetCid, "pIdKey": targetPcid}, "key": {"name": targetCname}},
        "callback": {"onClick": ""}
    };
    return settingsAfterAssembly;
}

//在当前树的基础上更改节点展示的名称，比如展示名称=名称+id
function changeNodeDisplayName() {
    if (datas != null) {
        //打开一个iframe弹出层，询问需要组合的内容
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.open({
                type: 2,
                shadeClose: true,
                shade: 0.8,
                area: ['85%', '85%'],
                content: '/iframeForChangeNodeName',
                success: function (layero, index) {
                    var iframeBody = layer.getChildFrame('body', index);
                    iframeBody.find('#datas').val(JSON.stringify(datas));//把查到的数据库信息往iframe传递
                    iframeBody.find('#treesettings').val(JSON.stringify(currentMainTreeSetting));//把查到的数据库信息往iframe传递
                    // layer.iframeAuto(index);
                }
            });
        });
    } else {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg('尚未获取数据', function () {
                //关闭后的操作
            });
        });
    }
}

//利用datas.list的数据生成一份变种data.list2，其中展示名称=cname+cid;返回值是处理后的JSON集合
function cnameWithCid(datasListJSON) {
    //从settings中查询cid/pcid/cname分别是哪个字段
    var cid_fieldName = currentMainTreeSetting.data.simpleData.idKey;
    var pcid_fieldName = currentMainTreeSetting.data.simpleData.pIdKey;
    var cname_fieldName = currentMainTreeSetting.data.key.name;
    //重新组装
    var newList = [];
    for (var i = 0; i < datasListJSON.length; i++) {
        var tempvalue_cid = datasListJSON[i][cid_fieldName];
        var tempvalue_pcid = datasListJSON[i][pcid_fieldName];
        var tempvalue_cname = datasListJSON[i][cname_fieldName] + tempvalue_cid;//将展示名称=cname+cid
        var tempJSON = {};
        tempJSON[cid_fieldName] = tempvalue_cid;
        tempJSON[pcid_fieldName] = tempvalue_pcid;
        tempJSON[cname_fieldName] = tempvalue_cname;
        newList.push(tempJSON);
    }
    return newList;
}

//弹出界面让用户选择cid/pcid/cname
function customChooseSettings() {
    //点击打开“选择字段”的页面
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.open({
            type: 2,
            title: '选择字段',
            shadeClose: false,
            closeBtn: 1,
            shade: 0.8,
            area: ['75%', '50%'],
            content: '/iframeForChooseSetting', //iframe的url。Controller跳转
            success: function (layero, index) {
                var iframeBody = layer.getChildFrame('body', index);
                iframeBody.find('#datacolumnnames').val(datas.columnnames);//信息往iframe传递
            }
        })
        ;
    });
}