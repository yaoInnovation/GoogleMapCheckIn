"""
IMHere URL Configuration
"""

from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
	url(r'^$', 'IMHere.views.index'), #Default page
	url(r'^index', 'IMHere.views.index', {'template_name':'IMHere/index.html'}, name='index'),
]
