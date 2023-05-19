#!/bin/bash
# This is a sample Bash script with some logic
# You can use it to test your parser tool

numbers=(3 7 2 1 8 4 5 9 6)

function get_largest_number {
  largest_number=${numbers[0]}
  for number in "${
