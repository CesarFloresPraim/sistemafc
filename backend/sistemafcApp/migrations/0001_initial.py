# Generated by Django 4.1.1 on 2022-09-27 21:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=50)),
                ('number', models.IntegerField()),
                ('daysOfWork', models.IntegerField(default=6)),
                ('startDate', models.TextField(max_length=50)),
                ('salary', models.FloatField(blank=True, default=0, null=True)),
                ('hasInflationBonus', models.BooleanField(default=False)),
                ('savingsPerWeek', models.FloatField(blank=True, default=0, null=True)),
                ('savingsAmount', models.FloatField(blank=True, default=0, null=True)),
                ('retentionPerWeek', models.FloatField(blank=True, default=0, null=True)),
                ('debtAmount', models.FloatField(blank=True, default=0, null=True)),
                ('hasInfonavit', models.BooleanField(default=False)),
                ('retentionInfonavit', models.FloatField(blank=True, default=0, null=True)),
                ('infonavitAmount', models.FloatField(blank=True, default=0, null=True)),
                ('endDate', models.TextField(max_length=50)),
                ('hasExtraHourFixed', models.BooleanField(default=False)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='sistemafcApp.department')),
            ],
        ),
        migrations.CreateModel(
            name='Observations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='SmallBox',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=50)),
                ('amount', models.FloatField(blank=True, default=0, null=True)),
                ('note', models.TextField(max_length=500)),
                ('date', models.TextField(max_length=50)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='sistemafcApp.employee')),
            ],
        ),
        migrations.CreateModel(
            name='Debt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=50)),
                ('amount', models.FloatField(blank=True, default=0, null=True)),
                ('note', models.TextField(max_length=500)),
                ('date', models.TextField(max_length=50)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='sistemafcApp.employee')),
            ],
        ),
    ]
