# Generated by Django 4.1.1 on 2022-10-09 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0028_vacation'),
    ]

    operations = [
        migrations.AddField(
            model_name='perception',
            name='isForSalary',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='vacation',
            name='toDate',
            field=models.TextField(max_length=50),
        ),
    ]
