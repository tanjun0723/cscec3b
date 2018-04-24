# coding=utf-8
import json
import os
from datetime import date, datetime

import sys
from django.conf import settings
from django.core.paginator import Paginator, EmptyPage, InvalidPage, PageNotAnInteger
from django.utils.timezone import utc


class MyEncoder(json.JSONEncoder):
  def default(self, obj):
      if isinstance(obj, datetime):
          return obj.strftime('%Y-%m-%d %H:%M:%S')
      elif isinstance(obj, date):
          return obj.strftime('%Y-%m-%d')
      else:
          return json.JSONEncoder.default(self, obj)

def pagination(objs,page,rows):
    try:
        page = int(page)
        if page < 1:
            page = 1
    except ValueError:
        page = 1
    paginator = Paginator(objs, rows)
    total = objs.count()
    try:
        objs = paginator.page(page)
    except (EmptyPage, InvalidPage, PageNotAnInteger):
        objs = paginator.page(1)
    objs = objs.object_list.values()
    data = {}
    data['rows'] = list(objs)
    data['total'] = total
    return data

def upload_file(request,upload_path):
   try:
        myFile =request.FILES.get("myfile", None)    # 获取上传的文件，如果没有文件，则默认为None
        if not myFile:
            return("no files for upload!")
        destination = open(upload_path,'wb+')    # 打开特定的文件进行二进制的写操作
        for chunk in myFile.chunks():      # 分块写入文件
            destination.write(chunk)
        destination.close()
        return("upload over!")
   except:
       info = sys.exc_info()
       return (info[0], ":", info[1])