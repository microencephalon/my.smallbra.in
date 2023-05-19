/**
 * This is a sample Java file with some logic
 * You can use it to test your parser tool
 */
public class test {

  public static void main(String[] args) {
      int[] numbers = {3, 7, 2, 1, 8, 4, 5, 9, 6};
      int largestNumber = getLargestNumber(numbers);
      System.out.println("The largest number is " + largestNumber);
  }

  public static int getLargestNumber(int[] numbers) {
      int largestNumber = numbers[0];
      for (int i = 1; i < numbers.length; i++) {
          if (numbers[i] > largestNumber) {
              largestNumber = numbers[i];
          }
      }
      return largestNumber;
  }

}
