# coding=utf-8
import json

import sys

from django.contrib import auth
from django.http import HttpResponse

from django.contrib.auth.models import User

def changpwd(request):
    try:
        res = {}
        username = request.session.get('username', None)
        oldpwd = request.GET.get('oldpwd')
        newpwd = request.GET.get('password1')
        user = auth.authenticate(username=username, password=oldpwd)
        if user is not None and user.is_active:
            u = User.objects.get(username__exact=username)
            u.set_password(newpwd)
            u.save()
            res["error"] = False
            res["msg"] = "修改成功！"
        else:
            res["error"] = True
            res["msg"] = "原始密码错误！"
    except:
        info = sys.exc_info()
        print info[0], ":", info[1]
        res["error"] = True
        res["msg"] = "修改失败！"
    return HttpResponse(json.dumps(res))
