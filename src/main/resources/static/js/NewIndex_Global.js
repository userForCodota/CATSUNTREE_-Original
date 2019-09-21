//储存属性文件内容
var global_properties;
//datas：JSON对象。储存查询后的tree数据和状态码、提示信息等，其中：
//      datas.status：状态码
//      datas.msg：服务器收集的提示信息
//      datas.columncount：查询结果临时表的字段数。用于判断是否能构成栏目树
//      datas.columnnames：查询结果临时表的表头，字符串数组
//      datas.list：查询结果临时表的数据，JSON对象集合
var datas;


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