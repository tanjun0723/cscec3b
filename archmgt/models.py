# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

'''
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
'''

class Nav(models.Model):
    id = models.IntegerField(default=0, primary_key=True)
    tid = models.IntegerField(default=0)
    text = models.CharField(max_length=50)
    iconCls = models.CharField(max_length=20)
    state = models.CharField(max_length=20, default='closed')
    url = models.CharField(max_length=50, null=True, blank=True)
    navLimit = models.CharField(max_length=5, default='0')

    def __unicode__(self):
        return '%s' % (self.text)
