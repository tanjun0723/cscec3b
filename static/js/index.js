$('#nav').tree({
	/*onBeforeLoad:function(node, param){
		console.log(node);
		console.log(param);
	},*/
	method: 'get',
	url: '/archmgt/getNav/?id=0',
	lines: true,
	onLoadSuccess:function(node,data){
		if(data){
			$(data).each(function(index,value){
				if(this.state=='closed'){
					$('#nav').tree('expandAll')
				}
			});
		}
	},
	onClick: function(node) {
		if(node.url){
			if($('#tabs').tabs('exists',node.text)){
				$('#tabs').tabs('select',node.text);
			}else{
				$('#tabs').tabs('add', {
					title: node.text,
					closable: true,
					href: node.url,
					closable:false
				});
			}
		}
	}
});

$('#tabs').tabs({
	fit: true,
	border: false
    // onBeforeClose: function (title,index) {
		// tab_option = $('#tabs').tabs('getTab').panel('options').tab;
		// tab_option.hide();
    // }
});

home = {
	pwd: function () {
		$('#pwd').dialog({top: "120px"});
		$('#pwd').dialog('open');
	},
	redo: function () {
		$('#pwd').dialog('close').form('reset');
    },
	commit: function () {
		if ($('#pwd').form('validate')){
			var params = serializeForm('pwd');
			$.ajax({
				url : '/archmgt/users/changpwd/?'+ params,
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
						$('#pwd').dialog('close').form('reset');
					}
				}
			});
		}
    }
}

login = {
	login: function () {
		$('#login').dialog({top: "120px"});
		$('#login').dialog('open');
	},
	redo: function () {
		$('#login').dialog('close').form('reset');
    },
	commit: function () {
		if ($('#login').form('validate')){
			var params = serializeForm('login');
			$.ajax({
				url : '/archmgt/login/?'+ params,
				type : 'get',
				beforeSend : function() {
					$.messager.progress({
						text : '登录中...',
					});
				},
				success : function(res) {
					$.messager.progress('close');
					var res = eval('(' + res + ')');
					if ( res.error ) {
						$.messager.alert('操作失败!',res.msg,'error');
					} else {
						window.location.reload();
						$('#login').dialog('close').form('reset');
					}
				}
			});
		}
    }
}

$('#password1').validatebox({
	required: true,
	validType: 'length[6,30]',
	missingMessage: '请输入密码',
	invalidMessage: '密码长度为6-30之间',
});
$('#password2').validatebox({
	required: true,
	validType: "equals['#password1']",
	missingMessage: '请输入密码',
});
$('#is1').linkbutton({
	text : '提交',
	width : '50px',
	height : '30px',
});
$('#is2').linkbutton({
	text : '取消',
	width : '50px',
	height : '30px',
});
$('#username').textbox({
	width: '220px',
	height: '25px',
	required: true,
});
$('#password').textbox({
	width: '220px',
	height: '25px',
	required: true,
});
$('#is3').linkbutton({
	text : '登录',
	width : '50px',
	height : '30px',
});
$('#is4').linkbutton({
	text : '取消',
	width : '50px',
	height : '30px',
});

$.extend($.fn.validatebox.defaults.rules, {
    equals: {
        validator: function(value,param){
            return value == $(param[0]).val();
        },
        message: '密码不一致！'
    }
});