$(function () {
    var TableID = 'dagzlc'
    var cols = [[
        {field: 'id', title: '编号', checkbox: true,},
        {field: 'devicename', title: '全宗号', width: 6,},
        {field: 'model', title: '档号', width: 8,},
        {field: 'serialnumber', title: '分类号', width: 10,},
        {field: 'standard', title: '案卷号', width: 6,},
        {field: 'amount', title: '归档年度', width: 6,},
        {field: 'depot1', title: '文件标题', width: 70,},
        {field: 'depot2', title: '页数', width: 6,},
        {field: 'depot3', title: '卷内顺序号', width: 8,},
        {field: 'unit', title: '载体类型', width: 6,},
        {field: 'stock', title: '备注', width: 20, },
    ]]

    var addURL = '/app01/dagzlc/addOne/';
    var editURL = '/app01/dagzlc/updateById';
    var getAllURL = '/app01/dagzlc/getAll/';
    var searchURL = '/app01/dagzlc/search/';
    var getByIdURL = '/app01/dagzlc/getById/';
    var delURL = '/app01/dagzlc/delById/';

    function showgrid() {
        var method = 'get';
        var url = getAllURL;
        var queryParams = {};
        baseGrid(TableID, method, url, queryParams, cols);
    }

    function searchDate() {
        var method = 'get';
        var url = searchURL;
        var queryParams = {
            s1: $('#dagzlcs1').val(),
            s2: $('#dagzlcs2').val()
        };
        baseGrid(TableID, method, url, queryParams, cols);
    }

    showgrid();

    AEForm(TableID, addURL, editURL);

    dagzlc_tool = {
        redo: function () {
            $('#' + TableID).datagrid('unselectAll');
        },
        reload: function () {
            showgrid();
        },
        add: function () {
            $('#form_' + TableID).dialog({title: "添加"});
            $('#form_' + TableID).dialog('open');
        },
        edit: function () {
            var rows = $('#' + TableID).datagrid('getSelections');
            var url = getByIdURL;
            editData(TableID, rows, url);
        },
        remove: function () {
            var rows = $('#' + TableID).datagrid('getSelections');
            var url = delURL;
            delData(TableID, rows, url);
        },
        search: function () {
            searchDate();
        },
        clear: function () {
            $('#dagzlcs1').textbox('clear');
            $('#dagzlcs2').textbox('clear');
            //$('#dagzlcs3').textbox('clear');
        },
    }

//tools
    $('#dagzlcs1').textbox({
        width: '150px',
        height: '25px',
    });
    $('#dagzlcs2').textbox({
        width: '150px',
        height: '25px',
    });
    $('#dagzlcs3').textbox({
        width: '150px',
        height: '25px',
    });

// dagzlc Form
    $('#dagzlcparam1').textbox({
        width: '220px',
        height: '25px',
        required: true,
    });
    $('#dagzlcparam2').textbox({
        width: '220px',
        height: '25px',
        required: true,
    });
    $('#dagzlcparam3').textbox({
        width: '220px',
        height: '75px',
        multiline: true,
    });
    $('#dagzlcparam4').textbox({
        width: '220px',
        height: '25px',
        //required: true,
    });
    $('#dagzlcparam5').textbox({
        width: '220px',
        height: '25px',
        required: true,
    });
    $('#dagzlcparam6').textbox({
        width: '220px',
        height: '25px',
        //required: true,
        value: '0',
    });
    $('#dagzlcparam7').textbox({
        width: '220px',
        height: '25px',
        //required: true,
        value: '0',
    });
    $('#dagzlcparam8').textbox({
        width: '220px',
        height: '25px',
        //required: true,
        value: '0',
    });
    $('#dagzlcparam9').textbox({
        width: '220px',
        height: '25px',
        required: true,
        value: '台',
    });
    $('#dagzlcparam10').textbox({
        width: '220px',
        height: '75px',
        multiline: true,
    });

});