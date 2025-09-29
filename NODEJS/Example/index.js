import { appendFileSync} from 'node:fs';
import {writeFile} from 'node:fs/promises';
import { addAndMultiply } from './math.js';


// const file = 'demo.txt';

// await writeFile(file, 'Hello Node.js');
// await appendFileSync(file, '\nFuck You');
// console.log(await readFile(file, 'utf8'));
// await rm(file, {force: true});
// console.log('file deleted.');

let a = 5
let b = 3
let result = addAndMultiply(a, b);
const file1 = 'test.txt';
await writeFile(file1, `Sum: ${result.sum}, Product: ${result.product}, Minus: ${result.minus}`);

