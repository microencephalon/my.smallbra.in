# This is a sample Python file with some logic
# You can use it to test your parser tool

def get_largest_number(numbers):
    largest_number = numbers[0]
    for number in numbers:
        if number > largest_number:
            largest_number = number
    return largest_number

numbers = [3, 7, 2, 1, 8, 4, 5, 9, 6]
largest_number = get_largest_number(numbers)
print(f"The largest number is {largest_number}")
