# coding=utf-8
import json

from django.http import HttpResponse
from archmgt.models import Nav

def getNav(request):
    id = request.GET.get('id')
    navs = Nav.objects.filter(tid=id).values()
    return HttpResponse(json.dumps(list(navs)), content_type="application/json")

