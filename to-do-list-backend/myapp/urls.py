from django.urls import path
from .views import TodoListView, TodoCreateView, TodoUpdateView, TodoDeleteView

urlpatterns = [
    path('', TodoListView.as_view(), name='todo-list'),  # Add this line to handle the root URL
    path('fetch', TodoListView.as_view(), name='todo-list'),  # Fetch all tasks
    path('create', TodoCreateView.as_view(), name='todo-create'),  # Create a new task
    path('<int:pk>/update', TodoUpdateView.as_view(), name='todo-update'),  # Update a specific task
    path('<int:pk>/delete', TodoDeleteView.as_view(), name='todo-delete'),  # Delete a specific task
]
