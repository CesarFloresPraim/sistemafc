# Generated by Django 4.1.1 on 2022-09-30 22:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0014_rename_registerrh_registerdetailrh_register'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registerdetailrh',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='employee_set', to='sistemafcApp.employee'),
        ),
    ]
