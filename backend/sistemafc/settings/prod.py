from .base import *

#
# DEBUG FLAG
#
DEBUG = False

#
# ALLOWED HOSTS
#
ALLOWED_HOSTS = ['sistemafc.com', 'www.sistemafc.com',]


#
# CORS CONFIGURATION
#
# CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOWED_ORIGINS = [
        'https://sistemafc.com',
        'https://www.sistemafc.com'
]

CORS_ALLOW_CREDENTIALS = True

#
# DATABASES
#
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config("DB_NAME"),
        'USER': config("DB_USERNAME"),
        'PASSWORD': config("DB_PASSWORD"),
    }
}

#
# STATIC FILES
#
import os

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')

