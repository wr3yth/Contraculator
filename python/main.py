

def convert_to_decimal(qwerty, expression):
    decimal_equivalent = 0
    for char in expression:
        decimal_equivalent = decimal_equivalent * len(qwerty) + qwerty.index(char)
    return decimal_equivalent

def convert_to_custom_base(qwerty, number):
    if number == 0:
        return '0'
    custom_base_representation = ''
    while number > 0:
        remainder = number % len(qwerty)
        custom_base_representation = qwerty[remainder] + custom_base_representation
        number = number // len(qwerty)
    return custom_base_representation

def calculate_expression(qwerty, expression):
    expression = expression.replace('+', ' + ').replace('-', ' - ').replace('*', ' * ').replace('/', ' / ')
    components = expression.split()
    components_decimal = [convert_to_decimal(qwerty, component) if component not in ['+', '-', '*', '/'] else component for component in components]
    decimal_result = eval(''.join(map(str, components_decimal)))
    custom_base_result = convert_to_custom_base(qwerty, decimal_result)
    regular_base_result = convert_to_custom_base("012345", decimal_result)
    return decimal_result, custom_base_result, regular_base_result

custom_system = input("Enter your custom numeric system: ")
print("Custom numeric system:", custom_system)

base = len(custom_system)
print("Base:", base)

print("Equivalent of each character in common numeric system:")
for index, char in enumerate(custom_system):
    print(f"{char}={index}, ", end='')

expression = input("\nEnter the expression to calculate: ")

decimal_result, custom_base_result, regular_base_result = calculate_expression(custom_system, expression)

print("Answer:")
print(expression.replace("+", " + ").replace("-", " - ").replace("*", " * ").replace("/", " / "), "=", custom_base_result, "(base", base, ")")
print(f"{regular_base_result} (base {base})")
print(f"{decimal_result} (base 10)")
