def convert_string_to_double(value: str) -> float:
    value = value.replace(",", ".")
    double = float(value)
    return double

def convert_double_to_string(value: float) -> str:
    value = str(value)
    string = value.replace('.', ',')
    return string