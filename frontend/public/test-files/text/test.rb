# This is a sample Ruby file with some logic
# You can use it to test your parser tool

def get_largest_number(numbers)
  largest_number = numbers[0]
  numbers.each do |number|
    largest_number = number if number > largest_number
  end
  largest_number
end

numbers = [3, 7, 2, 1, 8, 4, 5, 9, 6]
largest_number = get_largest_number(numbers)
puts "The largest number is #{largest_number}"
