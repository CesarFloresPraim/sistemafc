# Generated by Django 4.1.1 on 2022-10-29 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0032_alter_registerpayroll_registerdetail'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='attendancePrice',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='extraHourPrice',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='puntualityPrice',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
