from .base import *

#
# DEBUG FLAG
#
DEBUG = True

#
# ALLOWED HOSTS
#
ALLOWED_HOSTS = []

#
# CORS CONFIGURATION
#
CORS_ORIGIN_WHITELIST = ("http://localhost:3000", "http://127.0.0.1:3000")
CORS_ORIGIN_ALLOW_ALL = True
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
STATIC_URL = '/static/'

