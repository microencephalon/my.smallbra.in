// This is a sample Objective-C file with some logic
// You can use it to test your parser tool

#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        int numbers[] = {3, 7, 2, 1, 8, 4, 5, 9, 6};
        int largestNumber = numbers[0];
        int numElements = sizeof(numbers) / sizeof(numbers[0]);
        for (int i = 1; i < numElements; i++) {
            if (numbers[i] > largestNumber) {
                largestNumber = numbers[i];
            }
        }
        NSLog(@"The largest number is %d", largestNumber);
    }
    return 0;
}
