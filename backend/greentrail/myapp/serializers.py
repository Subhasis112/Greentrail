from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    UserProfile, Bus, Car, Driver, Guide, Hotel, Transaction, Item
)

User = get_user_model()


# ----------------------------
# Signup / Login / User
# ----------------------------
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_staff']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


# ----------------------------
# Driver / Guide / Vehicles
# ----------------------------
class DriverSerializer(serializers.ModelSerializer):
    cars = serializers.StringRelatedField(many=True)
    buses = serializers.StringRelatedField(many=True)

    class Meta:
        model = Driver
        fields = '__all__'


class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    driver = DriverSerializer(read_only=True)

    class Meta:
        model = Car
        fields = '__all__'


class BusSerializer(serializers.ModelSerializer):
    driver = DriverSerializer(read_only=True)

    class Meta:
        model = Bus
        fields = '__all__'


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Transaction
        fields = '__all__'


# # ----------------------------
# # Email OTP Serializer
# # ----------------------------
# class EmailOTPSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EmailOTP
#         fields = ['user', 'otp', 'is_verified', 'created_at']
#         read_only_fields = ['is_verified', 'created_at']

#     def create(self, validated_data):
#         validated_data['otp'] = EmailOTP.generate_otp()
#         return super().create(validated_data)
