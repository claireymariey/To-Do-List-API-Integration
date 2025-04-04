from django.urls import path
from .views import TodoListView, TodoCreateView, TodoDetailView  # Import only necessary views

urlpatterns = [
    path('', TodoListView.as_view(), name='todo-list'),  # To fetch all tasks
    path('fetch/', TodoListView.as_view(), name='todo-fetch'),  # Fetch tasks endpoint
    path('create/', TodoCreateView.as_view(), name='todo-create'),  # Create a new task
    path('<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),  # Retrieve, update, or delete a task
]
    