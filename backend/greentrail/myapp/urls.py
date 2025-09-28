from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, UserProfileViewSet, BusViewSet, CarViewSet,
    DriverViewSet, GuideViewSet, HotelViewSet, ItemViewSet,
    TransactionViewSet, SignupView, LoginView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'userprofiles', UserProfileViewSet)
router.register(r'buses', BusViewSet)
router.register(r'cars', CarViewSet)
router.register(r'drivers', DriverViewSet)
router.register(r'guides', GuideViewSet)
router.register(r'hotels', HotelViewSet)
router.register(r'items', ItemViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    # Remove the Verify OTP URL
    # path('auth/verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
]
