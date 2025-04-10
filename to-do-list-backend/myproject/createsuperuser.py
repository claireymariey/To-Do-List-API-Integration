# create_superuser.py

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from django.contrib.auth import get_user_model

# Custom user details
username = 'admin'
email = 'admin@email.com'
password = 'admin123'

User = get_user_model()

# Check if the user already exists
if not User.objects.filter(username=username).exists():
    user = User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser {user.username} created!")
else:
    print(f"Superuser with username {username} already exists.")
