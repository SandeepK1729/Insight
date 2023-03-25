# Generated by Django 4.1.7 on 2023-03-25 18:17

from django.db import migrations, models
import django.db.models.deletion
import pathlib


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dataset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('path', models.FileField(upload_to='datasets')),
                ('features', models.JSONField()),
                ('targets', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='ModelFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_name', models.CharField(max_length=30)),
                ('path', models.FilePathField(path=pathlib.PureWindowsPath('D:/Projectz/machine-learning-project/backend/static/saved_models'))),
                ('dataset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.dataset')),
            ],
        ),
    ]
