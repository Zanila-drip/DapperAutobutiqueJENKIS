from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        if self.request.user.user_type == 'admin':
            serializer.save()
        else:
            raise PermissionDenied("Solo los administradores pueden crear productos.")

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