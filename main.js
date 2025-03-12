import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';


async function readMatrix(path) {
    const response = await fetch(path);
    const text = await response.text();
    const matrix = text.split('\n').map(row => row.split(' ').map(Number));
    return matrix;
}
const S1B1 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B1.txt');
const S1B2 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B2.txt');
const S1B3 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B3.txt');
const S1B4 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B4.txt');
const S1B5 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B5.txt');
const S1B6 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B6.txt');
const S1B7 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B7.txt');
const S1B8 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B8.txt');
const S1B9 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B9.txt');
const S1B10 = await readMatrix('data/experiment-ii/S1/Sponge_Mat/Matrix_Sponge_B10.txt');




const weights = {
    87:1,
    85:2,
    100:3,
    66:4,
    96:5,
    63:6,
    74:7,
    79:8,
};

const subjects = {};
for (let i =0; i<8 ; i++){
    subjects[i+1] = {
        back: {
            Supine1: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B2.txt`),
            Supine2: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B1.txt`),
            Supine3: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B3.txt`),
            Supine4: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B4.txt`),
            Supine5: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B5.txt`),
            Supine6: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B6.txt`),
            Supine7: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B7.txt`),
            Supine8: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B8.txt`),
            Supine9: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B9.txt`),            
            Supine10: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_B10.txt`)

        },

        left:{            
            Left1: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_D2.txt`),
            Left2: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_D1.txt`),
            Left3: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_D3.txt`),

        },
        right: {
            Right1: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_C2.txt`),
            Right2: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_C1.txt`),
            Right3: await readMatrix(`data/experiment-ii/S${i+1}/Sponge_Mat/Matrix_Sponge_C3.txt`),
        }
    };
}

console.log(subjects);

var current_orintation = 'back';
var current_posture = 'Supine1';
var current_subject = 1;
var currentposition = subjects[current_subject][current_orintation][current_posture];


const svg = d3.select('#Matress-graph');


const cellSize = 9;
const rows = S1B2.length - 1;
const cols = S1B2[0].length;


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
    // const selected = this.value;
    // if (selected === 'S1B2') {
    //     currentposition = S1B2;
    // } else if (selected === 'S1B1') {
    //     currentposition = S1B1;
    // } else if (selected === 'S1B10') {
    //     currentposition = S1B10;
    // } else if (selected === 'S1B8') {
    //     currentposition = S1B8;
    // } else if (selected === 'S1B9') {
    //     currentposition = S1B9;
    // } else if (selected === 'S1B7') {
    //     currentposition = S1B7;
    // } else if (selected === 'S1B6') {
    //     currentposition = S1B6;
    // } else if (selected === 'S1B5') {
    //     currentposition = S1B5;
    // } else if (selected === 'S1B4') {
    //     currentposition = S1B4;
    // } else if (selected === 'S1B3') {
    //     currentposition = S1B3;
    // }
    svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
});

let selectCreated = false;
d3.select('#supine').on('click', function() {
    current_orintation = 'back';
    current_posture = 'Supine1';
    currentposition = subjects[current_subject].back[current_posture];
    svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
    if (!selectCreated) {
        const supine = d3.select('#Posture-changer').append('select').attr('id', 'posture');
        supine.selectAll('option').data(Object.keys(subjects[current_subject].back)).enter().append('option')
            .attr('value', d => d)
            .text(d => d);
        d3.select('#posture').on('change', function() {
            current_posture = this.value;
            currentposition = subjects[current_subject].back[current_posture];
            svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
        });
        selectCreated = true;
    }
    else{
        d3.select('#posture').remove();
        const supine = d3.select('#Posture-changer').append('select').attr('id', 'posture');
        supine.selectAll('option').data(Object.keys(subjects[current_subject].back)).enter().append('option')
            .attr('value', d => d)
            .text(d => d);
        d3.select('#posture').on('change', function() {
            current_posture = this.value;
            currentposition = subjects[current_subject].back[current_posture];
            svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
        });
    }
});


d3.select('#left').on('click', function() {
    current_orintation = 'left';
    current_posture = 'Left1';
    currentposition = subjects[current_subject].left[current_posture];
    svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
    if (!selectCreated) {
        const left = d3.select('#Posture-changer').append('select').attr('id', 'posture');
        left.selectAll('option').data(Object.keys(subjects[current_subject].left)).enter().append('option')
            .attr('value', d => d)
            .text(d => d);
        d3.select('#posture').on('change', function() {
            current_posture = this.value;
            currentposition = subjects[current_subject].left[current_posture];
            svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
        });
        selectCreated = true;
    }else{
        d3.select('#posture').remove();
        const left = d3.select('#Posture-changer').append('select').attr('id', 'posture');
        left.selectAll('option').data(Object.keys(subjects[current_subject].left)).enter().append('option')
            .attr('value', d => d)
            .text(d => d);
        d3.select('#posture').on('change', function() {
            current_posture = this.value;
            currentposition = subjects[current_subject].left[current_posture];
            svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
        });
    }
});

d3.select('#right').on('click', function() {
    current_orintation = 'right';
    current_posture = 'Right1';
    currentposition = subjects[current_subject].right[current_posture];
    svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
    if (!selectCreated) {
        const right = d3.select('#Posture-changer').append('select').attr('id', 'posture');
        right.selectAll('option').data(Object.keys(subjects[current_subject].right)).enter().append('option')
            .attr('value', d => d)
            .text(d => d);
        d3.select('#posture').on('change', function() {
            current_posture = this.value;
            currentposition = subjects[current_subject].right[current_posture];
            svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
        });
        selectCreated = true;
    }else{
        d3.select('#posture').remove();
        const right = d3.select('#Posture-changer').append('select').attr('id', 'posture');
        right.selectAll('option').data(Object.keys(subjects[current_subject].right)).enter().append('option')
            .attr('value', d => d)
            .text(d => d);
        d3.select('#posture').on('change', function() {
            current_posture = this.value;
            currentposition = subjects[current_subject].right[current_posture];
            svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
        });
    }
});

d3.select('#current_weight').on('change', function() {
    current_subject = weights[this.value];
    currentposition = subjects[current_subject][current_orintation][current_posture];
    svg.selectAll('rect').data(currentposition.flat()).attr('fill', d => d3.interpolateRdYlBu(d / 228.721));
});
