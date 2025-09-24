

# Create your models here.
from django.db import models
from django.contrib.auth.models import User



class Profile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE)
    auth_token = models.CharField(max_length=100 )
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


# Extend the built-in User model
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    aadhar_number=models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.user.username


# Hotel Information
class Hotel(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    available_rooms = models.IntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="hotels")

    def __str__(self):
        return self.name

class Item(models.Model):
    tribal_handicrafts = models.CharField(max_length=200)
    handwoven = models.CharField(max_length=200)
    paintings = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.tribal_handicrafts} - {self.handwoven} - {self.paintings}"


# Guide Information
class Guide(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=15, blank=True, null=True)
    aadhar_number=models.IntegerField(blank=True, null=True)
    languages = models.CharField(max_length=200, help_text="e.g. English, Hindi, Bengali")
    experience_years = models.IntegerField(default=0)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"Guide: {self.name}"


# Driver Information
class Driver(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=15, blank=True, null=True)
    aadhar_number=models.IntegerField(blank=True, null=True)
    license_number = models.CharField(max_length=50)
    vehicle_type = models.CharField(max_length=100, help_text="e.g. Car, Van, Bus")
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"Driver: {self.name}"


# Transaction Information (Booking/Payments)


class Transaction(models.Model):
    PAYMENT_METHODS = [
        ("upi", "UPI"),
        ("card", "Credit/Debit Card"),
        ("netbanking", "Net Banking"),
        ("wallet", "Wallet"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)   # who is paying
    aadhar_number=models.IntegerField(blank=True, null=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    upi_transaction_id = models.CharField(max_length=100, blank=True, null=True)
    platform_transaction_id = models.CharField(max_length=100, unique=True)  # Razorpay/Paytm etc.
    time = models.DateTimeField(auto_now_add=True)
    payee = models.CharField(max_length=200, help_text="Whom the user is paying (e.g. Hotel Owner, Guide, Platform)")
    amount=models.IntegerField(blank=True, null=True)
    def __str__(self):
        return f"{self.user.username} paid {self.payee} via {self.payment_method} on {self.time.strftime('%Y-%m-%d %H:%M')}"

