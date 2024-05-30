//Function to verify the rows
function processRows(sudokuArray) {
    // Nested for loop to save the array with the numbers in each row
    for (let i = 0; i < sudokuArray.length; i++) {
        let row = [];
        for (let j = 0; j < sudokuArray.length; j++) {
            row.push(sudokuArray[i][j]);
        }
        if (!verify(row)) {
            console.log(verify(row));
            appendError('line', row, i+1);
        }
    }
}

// Fucntion to verify the columns
function processColumns(sudokuArray) {
    // Nested for loop to save the array with the numbers in each column
    for (let j = 0; j < sudokuArray.length; j++) {
        let column = [];
        for (let i = 0; i < sudokuArray.length; i++) {
            column.push(sudokuArray[i][j]);
        }
        if (!verify(column)) {
            appendError('column', column, j+1);
        }
    }
}

// Function to verify the regions
function processRegions(sudokuArray) {
    let region = [];
    // Nested for loop to split different regions
    for (let row = 0; row < sudokuArray.length; row += 3) {
        for (let col = 0; col < sudokuArray.length; col += 3) {
            // Nested for loop to save the different regions numbers inside the array
            for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                    region.push(sudokuArray[i][j]);
                }
            }
        }
    }
    for (let i = 0; i < sudokuArray.length; i++) {
        if (!verify(region[i])) {
            appendError('region',region[i],i);
        }
    }
}

// Function to display the errors found by the other functions
function appendError(type, content, index) {
    // Variable to get the div
    const result = document.getElementById('result');
    const row = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = `Error in ${type} ${index}`;
    row.appendChild(td);
    content.forEach(num => {
        const cell = document.createElement('td');
        cell.textContent = num !== 0 ? num : '';
        row.appendChild(cell);
    });
    result.appendChild(row);
}