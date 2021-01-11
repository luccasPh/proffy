def convert_hour_to_minutes(value: str) -> int:
    hour, minutes = [int(x) for x in value.split(":")]
    time_in_minutes = (hour * 60) + minutes

    return time_in_minutes

def convert_minutes_to_hour(value: int) -> str:
    hour = value // 60
    minutes = value % 60
    if hour < 10:
        hour = f"0{hour}"
    if minutes < 10:
        minutes = f"0{minutes}"
    return f"{hour}:{minutes}"