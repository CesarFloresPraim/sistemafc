# Generated by Django 4.1.1 on 2022-09-30 20:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0009_alter_registerdetailrh_employee'),
    ]

    operations = [
        migrations.AddField(
            model_name='registerdetailrh',
            name='register',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.RESTRICT, to='sistemafcApp.registerrh'),
            preserve_default=False,
        ),
    ]
