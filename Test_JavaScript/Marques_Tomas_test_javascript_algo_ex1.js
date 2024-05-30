// Checks when a new file has been chosen and executes the function
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fileInput').addEventListener('change', to2Darray, false);
});

function to2Darray(event) {
    // Get the file selected by the user
    const file = event.target.files[0];
    
    // Check if a file was selected
    if (!file) {
        return;
    }

    // Create a new FileReader to read the file's content
    const reader = new FileReader();
    
    // Define the function that will be called when the file reading is complete
    reader.onload = function(e) {
        // Get the content of the read file
        const contents = e.target.result;
        
        // Execute the content of the file to define the array_number variable
        eval(contents);
        
        // Convert array_number from an array of strings to a 2D array of numbers
        const sudokuBoard = array_number.map(row => row.split(' ').map(Number));

        // Calls the function to display a table in the Main.html file with the sudoku content
        createAndDisplaySudokuTable(sudokuBoard);

        /*for (let i=0; i<sudokuBoard.length;i++) {
            if (verify(sudokuBoard[i])) {
                console.log('good');
            } else {
                console.log('not good');
            }
        }*/

        if(processRows(sudokuBoard) && processColumns(sudokuBoard) && processRegions(sudokuBoard)) {
            let result = document.getElementById('result');
            let text = document.createTextNode('The table is correct!');
            result.appendChild(text);
        }
        
        // Return the 2D array
        return sudokuBoard;
    };
    
    // Read the file as text
    reader.readAsText(file);
}

function createAndDisplaySudokuTable(sudokuArray) {
    // Get the div where the Sudoku table will be displayed
    const sudokuBoardDiv = document.getElementById('sudokuBoard');
    
    // Check if the sudokuBoardDiv exists
    if (!sudokuBoardDiv) {
        console.error("Element with id 'sudokuBoard' not found");
        return;
    }

    // Clear any existing content in the sudokuBoardDiv
    sudokuBoardDiv.innerHTML = '';

    // Create the table element
    const table = document.createElement('table');
    table.setAttribute('id', 'sudokuTable');

    // Iterate over the sudokuArray to create rows and cells
    for (let i = 0; i < sudokuArray.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < sudokuArray[i].length; j++) {
            const cell = document.createElement('td');
            // Create a text node with the value from sudokuArray
            const textNode = document.createTextNode(sudokuArray[i][j] !== 0 ? sudokuArray[i][j] : '');
            // Append the text node to the cell
            cell.appendChild(textNode);
            // Append the cell to the row
            row.appendChild(cell);
        }
        // Append the row to the table
        table.appendChild(row);
    }

    // Append the table to the sudokuBoardDiv
    sudokuBoardDiv.appendChild(table);
}
