# Generated by Django 4.1.1 on 2022-10-04 21:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sistemafcApp', '0024_deductiontype_perceptiontype_perception_deduction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perception',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='employee_perception_set', to='sistemafcApp.employee'),
        ),
    ]