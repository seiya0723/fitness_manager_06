# Generated by Django 3.2.15 on 2022-08-24 08:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('fitness', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='fitnessmemory',
            name='exe_dt',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='実施日時'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='foodmemory',
            name='exe_dt',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='実施日時'),
            preserve_default=False,
        ),
    ]
