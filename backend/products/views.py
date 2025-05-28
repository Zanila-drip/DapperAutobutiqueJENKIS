from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user.user_type == 'admin':
            serializer.save()
        else:
            raise PermissionDenied("Solo los administradores pueden editar productos.")

    def perform_destroy(self, instance):
        if self.request.user.user_type == 'admin':
            instance.delete()
        else:
            raise PermissionDenied("Solo los administradores pueden eliminar productos.")

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Cambiar esto

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
        
class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAdminUser]