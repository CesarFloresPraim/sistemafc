# Generated by Django 4.1.1 on 2022-10-09 07:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0031_alter_payroll_registerrh'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registerpayroll',
            name='registerDetail',
            field=models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, related_name='registerdetail_set', to='sistemafcApp.registerdetailrh'),
        ),
    ]
