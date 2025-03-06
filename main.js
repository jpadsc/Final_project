import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

// create a function that takes a path of a matrix in a txt file and retiurns the matrix
async function readMatrix(path) {
    const response = await fetch(path);
    const text = await response.text();
    const matrix = text.split('\n').map(row => row.split(' ').map(Number));
    return matrix;
}
const S1B2 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B2.txt');
console.log(S1B2);

const svg = d3.select('#Matress-graph');

// Draw the matrix S1B2 in svg
const cellSize = 8.577;
const rows = S1B2.length - 1;
console.log(rows);
const cols = S1B2[0].length;
console.log(cols);

// Flip the graph upside down
svg.attr('width', cols * cellSize).attr('height', rows * cellSize);
svg.selectAll('rect').data(S1B2.flat()).enter().append('rect')
    .attr('x', (d, i) => (i % cols) * cellSize)
    .attr('y', (d, i) => (rows - Math.floor(i / cols) - 1) * cellSize)
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('fill', d => d3.interpolateRdYlBu(d / 217));
