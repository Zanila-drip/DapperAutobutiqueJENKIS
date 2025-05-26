from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from .models import CustomUser

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Permitir login solo con email
        email = attrs.get('email')
        password = attrs.get('password')
        
        if not email:
            raise serializers.ValidationError("El email es requerido")
        
        try:
            user = CustomUser.objects.get(email=email)
            attrs['username'] = user.username  # Convertir email a username
            return super().validate(attrs)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Usuario no encontrado")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'user_type', 'phone', 'address']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'phone', 'address']
        extra_kwargs = {
            'user_type': {'default': 'customer'}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
            user_type='customer'
        )
        return user