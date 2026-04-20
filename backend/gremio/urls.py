from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GremioViewSet, AventureroViewSet

router = DefaultRouter()
router.register(r'gremios', GremioViewSet)
router.register(r'aventurero', AventureroViewSet)

urlpatterns = [
    path('', include(router.urls)),
]