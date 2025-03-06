import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

// create a function that takes a path of a matrix in a txt file and retiurns the matrix
async function readMatrix(path) {
    const response = await fetch(path);
    const text = await response.text();
    const matrix = text.split('\n').map(row => row.split(' ').map(Number));
    return matrix;
}
const S1B2 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B2.txt');
const S1B1 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B1.txt');
const S1B10 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B10.txt');
const S1B8 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B8.txt');
const S1B9 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B9.txt');
const S1B7 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B7.txt');
const S1B6 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B6.txt');
const S1B5 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B5.txt');
const S1B4 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B4.txt');
const S1B3 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B3.txt');
console.log(S1B2);

var currentposition = S1B2;

const svg = d3.select('#Matress-graph');


const cellSize = 8.577;
const rows = S1B2.length - 1;
console.log(rows);
const cols = S1B2[0].length;
console.log(cols);

// Flip the graph upside down
svg.attr('width', cols * cellSize).attr('height', rows * cellSize);
svg.selectAll('rect').data(currentposition.flat()).enter().append('rect')
    .attr('x', (d, i) => (i % cols) * cellSize)
    .attr('y', (d, i) => (rows - Math.floor(i / cols) - 1) * cellSize)
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('fill', d => d3.interpolateRdYlBu(d / 228.721));

// make it so that whenver the select item with current_posture id is changed, the variable currentposition is updated
d3.select('#current_posture').on('change', function() {
    const selected = this.value;
    if (selected === 'S1B2') {
        currentposition = S1B2;
    } else if (selected === 'S1B1') {
        currentposition = S1B1;
    } else if (selected === 'S1B10') {
        currentposition = S1B10;
    } else if (selected === 'S1B8') {
        currentposition = S1B8;
    } else if (selected === 'S1B9') {
        currentposition = S1B9;
    } else if (selected === 'S1B7') {
        currentposition = S1B7;
    } else if (selected === 'S1B6') {
        currentposition = S1B6;
    } else if (selected === 'S1B5') {
        currentposition = S1B5;
    } else if (selected === 'S1B4') {
        currentposition = S1B4;
    } else if (selected === 'S1B3') {
        currentposition = S1B3;
    }
    svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
});
