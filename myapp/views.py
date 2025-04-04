from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TodoItem
from .serializers import TodoItemSerializer

# View to fetch all To-Do items
class TodoListView(APIView):
    def get(self, request, *args, **kwargs):
        todos = TodoItem.objects.all()  # Get all To-Do items
        serializer = TodoItemSerializer(todos, many=True)
        return Response(serializer.data)

# View to create a new To-Do item
class TodoCreateView(APIView):
    def post(self, request, *args, **kwargs):
        print("Raw request data:", request.body)  # Debugging line
        
        serializer = TodoItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View to retrieve, update, or delete a specific To-Do item
class TodoDetailView(APIView):
    def get(self, request, pk, *args, **kwargs):
        try:
            todo = TodoItem.objects.get(pk=pk)  # Get To-Do item by pk
        except TodoItem.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = TodoItemSerializer(todo)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        try:
            todo = TodoItem.objects.get(pk=pk)  # Get To-Do item by pk
        except TodoItem.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        # Ensure both title and completed are updated
        serializer = TodoItemSerializer(todo, data=request.data, partial=False)  # Make sure full update
        if serializer.is_valid():
            serializer.save()  # Save updated To-Do item
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        try:
            todo = TodoItem.objects.get(pk=pk)  # Get To-Do item by pk
        except TodoItem.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        todo.delete()  # Delete To-Do item
        return Response(status=status.HTTP_204_NO_CONTENT)
