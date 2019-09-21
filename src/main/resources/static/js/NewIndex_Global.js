//【1】储存读取到的属性文件内容(json字符串)。
var global_properties;

//datas：储存查询后的tree数据和状态码、提示信息等，datas是json对象，但他的属性值全是字符串，根据情况再转JSON对象。其中：
//      datas.status：状态码
//      datas.msg：服务器收集的提示信息
//      datas.columncount：查询结果临时表的字段数。用于判断是否能构成栏目树
//      datas.columnnames：查询结果临时表的表头，字符串数组类型的JSON字符串
//      datas.list：查询结果临时表的数据，JSON对象集合的字符串类型
//      datas.tablename:表名
var datas;

//currentMainTreeSetting：记录当前主树使用的配置属性
var currentMainTreeSetting;
//##############################################################################################################################
//一个简单的获取当前系统时间并格式化的函数
function CurentTime() {
    var now = new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
}