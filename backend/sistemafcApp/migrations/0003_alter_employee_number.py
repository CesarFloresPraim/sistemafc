# Generated by Django 4.1.1 on 2022-09-27 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0002_employee_phone_alter_employee_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='number',
            field=models.IntegerField(),
        ),
    ]
