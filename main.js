const fs = require("fs");

// Encodes a relative position of a cell from another cell
function Delta(row, col) {
    this.row = row;
    this.col = col;
}

// A list of relative positions of neighbors any one cell may have
const neighbors = [
    new Delta(-1, -1),
    new Delta(-1, 0),
    new Delta(-1, 1),
    new Delta(0, -1),
    new Delta(0, 1),
    new Delta(1, -1),
    new Delta(1, 0),
    new Delta(1, 1)
];

// Main entry point of program
function main() {
    // Check if input file is given
    if (process.argv.length !== 3) {
        console.log("Usage: node main.js <file>");
        return;
    }

    // Parse the input board from the given file
    const input_board = parse_board(process.argv[2]);

    // Calculate the next generation
    const output_board = calculate_generation(input_board);

    // Format and output the new board
    output_board.map(row => console.log(row.join("")));
}

// Parse a board file as a 2D array of integers
function parse_board(filepath) {
    // Get the data from the file
    const data = fs.readFileSync(filepath, "utf8");

    // Return the board as a 2D array of integers
    return data
        .split("\n")
        .map(line => line.split("").map(elem => parseInt(elem)));
}

// Calculate a new board based off of an old input board
function calculate_generation(board) {
    // Create a deep copy of the old board
    const new_board = board.map(row => row.slice());

    // For every cell in the old board
    for (var row = 0; row < board.length; row++) {
        for (var col = 0; col < board[row].length; col++) {
            // Get the number of live adjacent neighbors
            const num_neighbors = count_neighbors(board, row, col);

            // Set current cell to appropriate "liveness"
            if (num_neighbors < 2) new_board[row][col] = 0;
            else if (num_neighbors > 3) new_board[row][col] = 0;
            else if (num_neighbors == 3) new_board[row][col] = 1;
        }
    }

    // Return the new board
    return new_board;
}

// Counts the number of alive neighbors in the given board
// at the location specified by row and col
function count_neighbors(board, row, col) {
    return (
        neighbors
            // Get all absolue positions of neighbors
            .map(neighbor => new Delta(neighbor.row + row, neighbor.col + col))

            // Filter out all neighbors that are out of bounds
            .filter(neighbor => {
                const row_check =
                    neighbor.row >= 0 && neighbor.row < board.length;
                const col_check =
                    neighbor.col >= 0 && neighbor.col < board[row].length;
                return row_check && col_check;
            })

            // Count all remaining neighbors
            .reduce(
                (total_neighbors, neighbor) =>
                    total_neighbors + board[neighbor.row][neighbor.col],
                0
            )
    );
}

// Have nodejs execute this module if it is ran through CMD
if (require.main == module) {
    main();
}
