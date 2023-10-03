<!-- This is a sample ASP file with some logic
You can use it to test your parser tool -->

<%
Dim numbers(8)
numbers(0) = 3
numbers(1) = 7
numbers(2) = 2
numbers(3) = 1
numbers(4) = 8
numbers(5) = 4
numbers(6) = 5
numbers(7) = 9
numbers(8) = 6

Function getLargestNumber(numbers)
    largestNumber = numbers(0)
    For i = 1 To UBound(numbers)
        If numbers(i) > largestNumber Then
            largestNumber = numbers(i)
        End If
    Next
    getLargestNumber = largestNumber
End Function

Response.Write "The largest number is " & getLargestNumber(numbers)
%>
