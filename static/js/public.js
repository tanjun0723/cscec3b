function baseGrid(TableID,method,url,queryParams,cols) {
    $('#'+TableID).datagrid({
        method: method,
        url : url,
        queryParams: queryParams,
        fit : true,
        fitColumns : true,
        striped : true,
        rownumbers : true,
        border : false,
        pagination : true,
        pagePosition : 'top',
        pageSize : 20,
        pageList : [ 10, 20, 30, 40, 50 ],
        pageNumber : 1,
        toolbar : '#'+TableID+'_tool',
        columns : cols,
    });
}

function AEForm(TableID,addURL,editURL) {
    $('#form_'+TableID).dialog({
        top : ($(window).height() - 420) * 0.5,
        width : 410,
        modal : true,
        closed : true,
        buttons : [{
            text : '提交',
            width : '50px',
            height : '30px',
            handler : function() {
                if ($('#form_'+TableID).form('validate')) {
                    var params = serializeForm('form_'+TableID);
                    var title = $('#form_'+TableID).panel('options').title;
                    if ( title==='添加'){
                        url = addURL + '?'+ params;
                    }else if (title==='修改'){
                        url = editURL + '?'+ params;
                    }
                    $.ajax({
                        url : url,
                        type : 'get',
                        beforeSend : function() {
                            $.messager.progress({
                                text : '正在添加中...',
                            });
                        },
                        success : function(res) {
                            $.messager.progress('close');
                            var res = eval('(' + res + ')');
                            if ( res.error ) {
                                $.messager.alert('操作失败!',res.msg,'warning');
                            } else {
                                $.messager.show({
                                    title : '提示',
                                    msg : res.msg,
                                });
                                $('#form_'+TableID).dialog('close').form('reset');
                                $('#'+TableID).datagrid('reload');
                            }
                        }
                    });
                }
            },
        },
        {
            text : '取消',
            width : '50px',
            height : '30px',
            handler : function() {
                $('#form_'+TableID).dialog('close').form('reset');
                    },
                } ]
    });
}

function delData(TableID,rows,url) {
    if (rows.length > 0) {
        $.messager.confirm('确定操作', '您确定要删除所选记录吗？', function (flag) {
            if (flag) {
                var ids = [];
                for (var i = 0; i < rows.length; i++) {
                    ids.push(rows[i].id);
                }
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        ids: ids.join(','),
                    },
                    beforeSend: function () {
                        $('#'+TableID).datagrid('loading');
                    },
                    success: function (res) {
                        var res = eval('(' + res + ')');
                        if ( res.error ) {
                            $.messager.alert('操作失败！',res.msg,'warning');
                        } else {
                            $('#'+TableID).datagrid('loaded');
                            $('#'+TableID).datagrid('load');
                            $('#'+TableID).datagrid('unselectAll');
                            $.messager.show({
                                title : '提示',
                                msg : res.msg,
                            });

                        }
                    }
                });
            }
        });
    } else {
        $.messager.alert('提示', '请选择要删除的记录', 'info');
    }
}

function editData(TableID,rows,url) {
    if (rows.length > 1) {
            $.messager.alert('警告操作！', '编辑记录只能选定一条数据！', 'warning');
        } else if (rows.length == 1) {
            $.ajax({
                url: url,
                type: 'get',
                data: {
                    id: rows[0].id,
                },
                beforeSend: function () {
                    $.messager.progress({
                        text: '正在获取中...',
                    });
                },
                success: function (result) {
                    $.messager.progress('close');
                    if (result) {
                        var obj = result[0]
                        $('#form_'+TableID).dialog({title: "修改"});
                        $('#form_'+TableID).form('load',obj).dialog('open');
                    } else {
                        $.messager.alert('获取失败！', '未知错误，请重试！', 'warning');
                    }
                },
                error: function () {
                    $.messager.progress('close');
                    $.messager.alert('获取失败！', '未知错误，请重试！', 'error');
                }
            });
        } else if (rows.length == 0) {
            $.messager.alert('警告操作！', '编辑记录至少选定一条数据！', 'warning');
        }
}

//------  js获取form表单所有数据  ------
//获取指定form中的所有的<input>对象
function getElements(formId) {
  var form = document.getElementById(formId);
  var elements = new Array();
  var tagElements = form.getElementsByTagName('input');
  for (var j = 0; j < tagElements.length; j++){
     elements.push(tagElements[j]);

  }
  return elements;
}
//获取单个input中的【name,value】数组
function inputSelector(element) {
 if (element.checked)
   return [element.name, element.value];
}

function input(element) {
  switch (element.type.toLowerCase()) {
   case 'submit':
   case 'hidden':
   case 'password':
   case 'text':
    return [element.name, element.value];
   case 'checkbox':
   case 'radio':
    return inputSelector(element);
  }
  return false;
}
//组合URL
function serializeElement(element) {
  var method = element.tagName.toLowerCase();
  var parameter = input(element);

  if (parameter) {
   var key = encodeURIComponent(parameter[0]);
   if (key.length == 0) return;

   if (parameter[1].constructor != Array)
    parameter[1] = [parameter[1]];

   var values = parameter[1];
   var results = [];
   for (var i=0; i<values.length; i++) {
    results.push(key + '=' + encodeURIComponent(values[i]));
   }
   return results.join('&');
  }
 }
//调用方法
function serializeForm(formId) {
  var elements = getElements(formId);
  var queryComponents = new Array();

  for (var i = 0; i < elements.length; i++) {
   var queryComponent = serializeElement(elements[i]);
   if (queryComponent)
    queryComponents.push(queryComponent);
  }

  return queryComponents.join('&');
}
//------  end：js获取form表单所有数据  ------

