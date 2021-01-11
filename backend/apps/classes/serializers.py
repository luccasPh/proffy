import uuid
from rest_framework import serializers

from .utils.time import convert_hour_to_minutes, convert_minutes_to_hour
from .models import Class, Schedule
from apps.users.serializers import UserSerializer

class ScheduleSerializer(serializers.ModelSerializer):
    id = serializers.CharField(required=False)

    def to_internal_value(self, data: dict):
        froM = convert_hour_to_minutes(data.get('froM'))
        to = convert_hour_to_minutes(data.get('to'))
        data['froM'], data['to'] = froM, to

        return super().to_internal_value(data)
    
    def to_representation(self, instance):
        data = super(ScheduleSerializer, self).to_representation(instance)
        froM = convert_minutes_to_hour(data.get('froM'))
        to = convert_minutes_to_hour(data.get('to'))
        data['froM'], data['to'] = froM, to

        return data

    class Meta:
        model = Schedule
        fields = ('id', 'week_day', 'froM', 'to')

class ClassSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True)
    del_schedules = serializers.ListField(required=False)

    def create(self, validated_data: dict):
        user = self.context.get('user')
        schedules_list = validated_data.pop('schedules')
        _class: Class = Class.objects.create(**validated_data, user_id=user)
        for schedule_data in schedules_list:
            Schedule.objects.create(**schedule_data, class_id=_class)
        return _class
    
    def update(self, instance: Class, validated_data: dict):
        schedules_list = validated_data.pop('schedules')
        del_schedules_list = validated_data.pop('del_schedules')
        instance.subject = validated_data.get('subject', instance.subject)
        instance.cost = validated_data.get('cost', instance.cost)
        instance.save()
        for schedule_data in schedules_list:
            if schedule_data.get('id'):
                Schedule.objects.filter(id=schedule_data.get('id')).update(**schedule_data)
            else:
                Schedule.objects.create(**schedule_data, class_id=instance)
        
        for schedule_id in del_schedules_list:
            Schedule.objects.filter(id=schedule_id).delete()
        
        return instance

    class Meta:
        model = Class
        fields = ('id', 'subject', 'cost', 'schedules', 'del_schedules')
        extra_kwargs = {'del_schedules': {'write_only': True}}

class QueryParamsSerializer(serializers.Serializer):
    week_day = serializers.CharField()
    subject = serializers.CharField()
    schedule = serializers.CharField()

    def to_internal_value(self, data: dict):
        new_data = data.copy()
        new_data['schedule'] = convert_hour_to_minutes(new_data.get('schedule'))
        return super().to_internal_value(new_data)

class ClassListSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True)
    user = UserSerializer(source='user_id')

    def to_representation(self, instance):
        classes: dict = super(ClassListSerializer, self).to_representation(instance)
        schedules = classes.get('schedules')
        format_schedules = []
        for i in range(1, 6):
            match = False
            for schedule in schedules:
                if i == schedule.get('week_day'):
                    data = {
                        "id": schedule['id'],
                        "week_day": schedule['week_day'],
                        "froM": schedule['froM'].replace("0", "").replace(":",""),
                        "to": schedule['to'].replace("0", "").replace(":","")
                    }
                    format_schedules.append(data)
                    match = True
                    break
            
            if not match:
                data = {
                    "week_day": i,
                    "froM": "",
                    "to": "",
                }
                format_schedules.append(data)

        classes['schedules'] = format_schedules
        return classes

    class Meta:
        model = Class
        fields = ('id','subject', 'cost', 'user', 'schedules')
