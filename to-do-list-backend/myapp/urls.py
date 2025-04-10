from django.urls import path
from .views import TodoListView, TodoCreateView, TodoUpdateView, TodoDeleteView
from myapp.views import MyProtectedView
from myapp.views import SecureHelloView

urlpatterns = [
    path('fetch/', TodoListView.as_view(), name='todo-list'),
    path('create/', TodoCreateView.as_view(), name='todo-create'),
    path('<int:pk>/update/', TodoUpdateView.as_view(), name='todo-update'),
    path('<int:pk>/delete/', TodoDeleteView.as_view(), name='todo-delete'),
    path('api/protected/', MyProtectedView.as_view(),name='protected-view'),
    path('secure-hello/', SecureHelloView.as_view()),

]
