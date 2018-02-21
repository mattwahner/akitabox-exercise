# akitabox-exercise

Answer to Akitabox's code challenge #1

# Usage

This exercise uses nodejs 8 to run locally. Input is assumed to be correctly formatted plain text file similar to the input presented in the coding exercise pdf. Rows are delimited by newlines (\n) and elements in columns are one character long entries that can take either the value of 0 or 1. Reference test_input.txt.  
To run the program, use:  
`node main.js <file>`

# Code Overview

`main.js` uses a multitude of higher order functions to iterate over all neighbors. The main flow of the program follows:

1. Parse the inputted board file
2. Create a copy of the board
3. For every cell in the old board
    1. Count the amount neighbors that cell has
    2. Update the corresponding new board's cell as dead or alive
4. Format and output the new board
