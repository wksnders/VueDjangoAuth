from django.contrib import admin
from django.contrib.auth.admin import UserAdmin 
from .models import CustomUser

# id, password, last_login, is_superuser, first_name, last_name
#email(Special, Unique Constraint), is_staff, is_active, date_joined
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):   
     model = CustomUser
     ordering = ('email',)
     list_display = ['email', 'first_name',
                  'last_name', 'is_staff','is_superuser','last_login','date_joined']
     list_filter = ('is_staff', 'is_active', 'groups')
     fieldsets = (
         (None, {'fields': ('email', 'password')}),
         ('Personal Info', {'fields': ('first_name', 'last_name')}),
         ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
         ('Important Dates', {'fields': ('last_login', 'date_joined')}),
     )
     add_fieldsets = (
         (None, {
             'classes': ('wide',),
             'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active'),
         }),
     )
     search_fields = ('email', 'first_name', 'last_name')