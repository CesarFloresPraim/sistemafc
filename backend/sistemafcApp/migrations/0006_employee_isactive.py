# Generated by Django 4.1.1 on 2022-09-28 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0005_alter_employee_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]
