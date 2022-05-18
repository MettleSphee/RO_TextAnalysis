# RO_TextAnalysis
My implementation in JavaScript of a text analysis program.
It reads an user-inputted text file (usually in Romanian) and performs said analysis on the text as follows:
- counts each letter in the Romanian alphabet, as well as the percentage;
- counts the total amount of letters;
- counts the total amount of characters;
- calculates the total percentage, and whether the difference between said percentage and 100% is less than 1%;
- calculates the Huffman code of each letter;
- calculates the average word length;
- calculates the letter entropy, based on the formula:
entropy = Sum(from 1 to amount of unique letters) of (letter's percentage * log2 (1 / letter_percentage);
- calculates the minimum word length, based on the formula:
minimum_wordlength = entropy / log2(wordCount)
- verifies Shannon's 1st Theorem;
- calculates the efficiency and redundancy, based on the formulas:
efficiency = minimum_wordlength / average_wordlength;
redundancy = 1 - efficiency;

If a letter doesn't appear in the text file (for example, W),
it will still be shown in the output but won't be taken into account when performing the calculations.
The program contains comments in Romanian, detailing some parts of the process.
A live version is available at: https://mettlesphee.github.io/RO_TextAnalysis/

For more information, visit the following links on Wikipedia which detail both Huffman and Shannon-Fano coding:
https://en.wikipedia.org/wiki/Huffman_coding
https://en.wikipedia.org/wiki/Shannon%E2%80%93Fano_coding
