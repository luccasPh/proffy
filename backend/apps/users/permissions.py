from rest_framework import permissions
from rest_framework.request import Request

class IsPostOrIsAuthenticated(permissions.BasePermission):        

     def has_permission(self, request: Request, view) -> bool:
        # allow all POST requests
        if request.method == 'POST':
            return True

        # Otherwise, only allow authenticated requests
        # Post Django 1.10, 'is_authenticated' is a read-only attribute
        return request.user and request.user.is_authenticated