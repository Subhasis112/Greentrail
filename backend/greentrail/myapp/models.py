from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
import random

# ----------------------------
# UserProfile for extra fields
# ----------------------------
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    aadhar_number = models.CharField(max_length=12, unique=True)
    dob = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"


# ---------------- Driver ----------------
class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    aadhar_number = models.CharField(max_length=12)
    age = models.IntegerField()
    
    # Vehicles assigned to driver (reverse relation from Car/Bus)
    def __str__(self):
        return self.user.username


# ---------------- Guide ----------------
class Guide(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    licence_number = models.CharField(max_length=50)
    aadhar_number = models.CharField(max_length=12)
    age = models.IntegerField()
    experience_years = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username


# ---------------- Car ----------------
class Car(models.Model):
    model = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=50)
    license_number = models.CharField(max_length=50)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True, related_name='cars')

    def __str__(self):
        return f"{self.model} ({self.registration_number})"


# ---------------- Bus ----------------
class Bus(models.Model):
    model = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=50)
    license_number = models.CharField(max_length=50)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True, related_name='buses')

    def __str__(self):
        return f"{self.model} ({self.registration_number})"


# ---------------- Hotel ----------------
class Hotel(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    city = models.CharField(max_length=50)
    rating = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name


# ---------------- Transaction ----------------
class Transaction(models.Model):
    PAYMENT_METHODS = [
        ("upi", "UPI"),
        ("card", "Credit/Debit Card"),
        ("netbanking", "Net Banking"),
        ("wallet", "Wallet"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    amount = models.FloatField()
    receiver = models.CharField(max_length=100)  # hotel, driver, guide, etc.
    payment_for = models.CharField(max_length=100)  # Car, Bus, Guide, Hotel, etc.
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} paid {self.amount} for {self.payment_for}"


# ---------------- Item ----------------
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# # ---------------- Email OTP for Verification ----------------
# class EmailOTP(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     otp = models.CharField(max_length=6)
#     created_at = models.DateTimeField(auto_now_add=True)
#     is_verified = models.BooleanField(default=False)

#     def is_expired(self):
#         return self.created_at < datetime.now() - timedelta(minutes=10)

#     def __str__(self):
#         return f"OTP for {self.user.email} - {self.otp}"

#     @staticmethod
#     def generate_otp():
#         return str(random.randint(100000, 999999))
