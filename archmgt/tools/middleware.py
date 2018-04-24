from django.shortcuts import render,HttpResponse,redirect,HttpResponseRedirect

try:
    from django.utils.deprecation import MiddlewareMixin  # Django 1.10.x
except ImportError:
    MiddlewareMixin = object  # Django 1.4.x - Django 1.9.x

class SimpleMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path != '/app01/login/'and request.path != '/app01/logout/' and request.path != \
                '/static/css/font-awesome.min.css' and request.path != '/static/css/bootstrap.min.css' and request.path != \
                '/static/css/bootstrap-theme.min.css' and request.path != '/static/css/templatemo_style.css'and request.path != \
                '/static/img/logo.png' and request.path != '/static/fonts/FontAwesome.otf' and request.path != \
                '/static/fonts/fontawesome-webfont.eot' and request.path != '/static/fonts/fontawesome-webfont.svg' and request.path !=\
                '/static/fonts/fontawesome-webfont.ttf' and request.path != '/static/fonts/fontawesome-webfont.woff':
            if  request.session.get('username',None):
                pass
            else:
                return HttpResponseRedirect('/app01/login/')