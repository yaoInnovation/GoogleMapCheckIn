"""
IMHere URL Configuration
"""

from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
	url(r'^$', 'IMHere.views.index'), #Default page
	url(r'^index', 'IMHere.views.index', name='index'),
	url(r'^home', 'IMHere.views.home', name='home'),
	url(r'^send_email', 'IMHere.views.send_email', name='send_email'),
	url(r'^get_static_map', 'IMHere.views.get_static_map', name='get_static_map'),
]
