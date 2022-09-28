# Generated by Django 4.1.1 on 2022-09-28 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0003_alter_employee_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='isCurrent',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='endDate',
            field=models.TextField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='startDate',
            field=models.TextField(blank=True, max_length=50, null=True),
        ),
    ]