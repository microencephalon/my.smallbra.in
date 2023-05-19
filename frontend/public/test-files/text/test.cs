// This is a sample C# file with some logic
// You can use it to test your parser tool

using System;

class Program
{
    static void Main(string[] args)
    {
        int[] numbers = {3, 7, 2, 1, 8, 4, 5, 9, 6};
        int largestNumber = numbers[0];
        for (int i = 1; i < numbers.Length; i++) {
            if (numbers[i] > largestNumber) {
                largestNumber = numbers[i];
            }
        }
        Console.WriteLine("The largest number is " + largestNumber);
    }
}
