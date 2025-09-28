from django.contrib import admin
from .models import Driver, Guide, Car, Bus, Transaction, UserProfile, Hotel, Item

# Decorator-based registration for models with custom admin
@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'aadhar_number', 'age')
    search_fields = ('user__username', 'phone_number', 'aadhar_number')

@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'licence_number', 'aadhar_number', 'age', 'experience_years')
    search_fields = ('user__username', 'phone_number', 'licence_number')

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('model', 'registration_number', 'license_number', 'driver')
    search_fields = ('model', 'registration_number', 'driver__user__username')

@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display = ('model', 'registration_number', 'license_number', 'driver')
    search_fields = ('model', 'registration_number', 'driver__user__username')

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'payment_method', 'amount', 'receiver', 'payment_for', 'timestamp')
    search_fields = ('user__username', 'receiver', 'payment_for')
    list_filter = ('payment_method', 'timestamp')

# Simple registration for models without custom admin
admin.site.register(UserProfile)
admin.site.register(Hotel)
admin.site.register(Item)
