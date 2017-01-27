"""mobile_chart URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from django.conf import settings
from django.conf.urls.static import static

from app1.views import prueba1, peticionLuces, peticionAjax

urlpatterns = [

    url(r'^admin/', admin.site.urls), url(r'^prueba1/$', prueba1),
    url(r'^peticionLuces/$', peticionLuces),
    url(r'^peticionAjax/$', peticionAjax)
    
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
