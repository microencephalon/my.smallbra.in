<?php
// This is a sample PHP file
// You can use it to test your parser tool

// Your code here
?>
a<?php
// This is a sample PHP file with some realistic code
// You can use it to test your parser tool

// Define some constants
define("PI", 3.14159);
define("TAX_RATE", 0.08);

// Define some variables
$name = "John";
$age = 30;
$balance = 1000.50;
$tax_amount = $balance * TAX_RATE;

// Define a function
function calculate_circle_area($radius) {
    $area = PI * pow($radius, 2);
    return $area;
}

// Call the function and print the result
$radius = 5;
$area = calculate_circle_area($radius);
echo "The area of the circle with radius $radius is $area\n";

// Use a loop to print numbers 1 through 10
for ($i = 1; $i <= 10; $i++) {
    echo "$i ";
}

// Use an if statement to print a message based on the user's age
if ($age < 18) {
    echo "Sorry, you are not old enough to vote.\n";
} else {
    echo "You are eligible to vote. Please go to the polling station on election day.\n";
}

// Print the user's name, age, balance, and tax amount
echo "Name: $name\n";
echo "Age: $age\n";
echo "Balance: $balance\n";
echo "Tax Amount: $tax_amount\n";
?>
