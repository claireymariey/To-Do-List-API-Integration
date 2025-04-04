from django.urls import path
from .views import TodoListView, TodoCreateView, TodoDetailView  # Import only necessary views

urlpatterns = [
<<<<<<< HEAD
    path('', TodoListView.as_view(), name='todo-list'),  # To fetch all tasks
    path('fetch/', TodoListView.as_view(), name='todo-fetch'),  # Fetch tasks endpoint
    path('create/', TodoCreateView.as_view(), name='todo-create'),  # Create a new task
    path('<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),  # Retrieve, update, or delete a task
=======
    path('', TodoListView.as_view(), name='todo-list'),  # Add this line to handle the root URL
    path('fetch', TodoListView.as_view(), name='todo-list'),  # Fetch all tasks
    path('create', TodoCreateView.as_view(), name='todo-create'),  # Create a new task
    path('<int:pk>/update', TodoUpdateView.as_view(), name='todo-update'),  # Update a specific task
    path('<int:pk>/delete', TodoDeleteView.as_view(), name='todo-delete'),  # Delete a specific task
>>>>>>> cceb718634eb368effcb8c3f81da1fd1b5b7814d
]
    