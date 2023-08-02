// This is a sample Swift file with some logic
// You can use it to test your parser tool

var numbers = [3, 7, 2, 1, 8, 4, 5, 9, 6]
var largestNumber = numbers[0]
for number in numbers {
    if number > largestNumber {
        largestNumber = number
    }
}
print("The largest number is \(largestNumber)")

var name: String? = "John Doe"
if let unwrappedName = name {
    print("Hello, \(unwrappedName)!")
} else {
    print("Hello, world!")
}

let firstName = "John"
let lastName = "Doe"
let fullName = "\(firstName) \(lastName)"
print("The full name is \(fullName)")

var x = 10
while x > 0 {
    print("\(x)...")
    x -= 1
}
print("Blast off!")
