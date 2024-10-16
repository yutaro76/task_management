from rest_framework import serializers
from .models import User

# class UserSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = User
#     fields = ('id', 'username', 'password')
#     extra_kwargs = {'password':{'write_only': True, 'required': True}}
#   def create(self, validated_data):
#     user = User.objects.create_user(**validated_data)
#     return user

class UserSerializer(serializers.ModelSerializer):
  created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
  updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

  class Meta:
    model = User
    fields = ['id', 'name', 'created_at', 'updated_at']