// This is a sample Go file with some logic
// You can use it to test your parser tool

package main

import (
    "fmt"
)

func getLargestNumber(numbers []int) int {
    largestNumber := numbers[0]
    for _, number := range numbers {
        if number > largestNumber {
            largestNumber = number
        }
    }
    return largestNumber
}

func main() {
    numbers := []int{3, 7, 2, 1, 8, 4, 5, 9, 6}
    largestNumber := getLargestNumber(numbers)
    fmt.Printf("The largest number is %d\n", largestNumber)
}
