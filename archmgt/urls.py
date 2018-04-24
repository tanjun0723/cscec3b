# coding=utf-8
from django.conf.urls import url

from archmgt import views
from archmgt.apis import NavImp
from archmgt.apis import userImp

urlpatterns = [

    # NavImp
    url(r'getNav/$', NavImp.getNav, name='getNav'),

    # views
    url(r'^$', views.index, name='index'),
    url(r'index/$', views.index, name='index'),
    url(r'login/$', views.login, name='login'),
    url(r'logout/$', views.logout, name='logout'),
    url(r'redirectSubPage/(\d+)/$', views.redirectSubPage),

    # userImp
    url(r'users/changpwd/$', userImp.changpwd),


]
