# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.contrib import auth
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response

from django.views.decorators.csrf import csrf_exempt

def index(request):
    username = request.session.get('username', None)
    return render_to_response('index.html', {
        'username': username,
        }
                              )

@csrf_exempt
def login(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    print username,password,'----------'
    user = auth.authenticate(username=username, password=password)
    res = {}
    if user is not None and user.is_active:
        request.session['username'] = username
        res["error"] = False
    else:
        res["msg"] = "帐号或密码错误！"
        res["error"] = True
    return HttpResponse(json.dumps(res))

def logout(request):
    if request.session.get('username', None) is not None:
        del request.session['username']
    return HttpResponseRedirect('/archmgt/index/')

def redirectSubPage(request,id):
    username = request.session.get('username', None)
    name = 't'+str(id)
    return render_to_response(name+'.html',{ 'username': username })