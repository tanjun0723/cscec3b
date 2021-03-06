# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2018-04-17 03:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Nav',
            fields=[
                ('id', models.IntegerField(default=0, primary_key=True, serialize=False)),
                ('tid', models.IntegerField(default=0)),
                ('text', models.CharField(max_length=50)),
                ('iconCls', models.CharField(max_length=20)),
                ('state', models.CharField(default='closed', max_length=20)),
                ('url', models.CharField(blank=True, max_length=50, null=True)),
                ('navLimit', models.CharField(default='0', max_length=5)),
            ],
        ),
    ]
