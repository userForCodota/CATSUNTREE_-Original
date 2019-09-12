// 本JS处理ajax获取栏目数据
$(function () {
    $("#connDB").click(function () {
        var jdbcinfo = $("#JDBC_Info_Textarea").val();
        if (jdbcinfo != "") {
            jdbcinfo = jdbcinfo.trim();
            // 启动ajax
            $.ajax({
                url: "/queryDB",
                Type: "post",
                data: {
                    "jdbcjson": jdbcinfo
                },
                dataType: "json",
                success: function (data) {
                    console.log(data.status);
                },
                error: function () {
                    alert("出错");
                }
            });
        }
    });
});