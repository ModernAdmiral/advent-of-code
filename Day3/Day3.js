// --- Day 3: Binary Diagnostic ---
// The submarine has been making some odd creaking noises, so you ask it to produce a diagnostic report just in case.

// The diagnostic report (your puzzle input) consists of a list of binary numbers which, when decoded properly, can tell you many useful things about the conditions of the submarine. The first parameter to check is the power consumption.

// You need to use the binary numbers in the diagnostic report to generate two new binary numbers (called the gamma rate and the epsilon rate). The power consumption can then be found by multiplying the gamma rate by the epsilon rate.

// Each bit in the gamma rate can be determined by finding the most common bit in the corresponding position of all numbers in the diagnostic report. For example, given the following diagnostic report:

// 00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010
// Considering only the first bit of each number, there are five 0 bits and seven 1 bits. Since the most common bit is 1, the first bit of the gamma rate is 1.

// The most common second bit of the numbers in the diagnostic report is 0, so the second bit of the gamma rate is 0.

// The most common value of the third, fourth, and fifth bits are 1, 1, and 0, respectively, and so the final three bits of the gamma rate are 110.

// So, the gamma rate is the binary number 10110, or 22 in decimal.

// The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used. So, the epsilon rate is 01001, or 9 in decimal. Multiplying the gamma rate (22) by the epsilon rate (9) produces the power consumption, 198.

// Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together. What is the power consumption of the submarine? (Be sure to represent your answer in decimal, not binary.)

// const testArr = [
//     "00100", 
//     "11110", 
//     "10110", 
//     "10111", 
//     "10101", 
//     "01111", 
//     "00111", 
//     "11100", 
//     "10000", 
//     "11001", 
//     "00010", 
//     "01010"
// ]

const testArr = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"
]

const fs = require("fs");

const binaryDiagnosticPart1 = (input) => {
    let gammaRate = ''
    let epsilonRate = ''
    const binaryLength = input[0].length

    for (let i = 0; i < binaryLength; i++) {
        let ones = 0
        let zeros = 0

        for (let j = 0; j < input.length; j++) {
            if (input[j][i] === '1') {
                ones += 1
            } else {
                zeros += 1
            }
        }
        if (ones > zeros) {
            gammaRate = gammaRate + '1'
            epsilonRate = epsilonRate + '0'
        }
        else {
            gammaRate = gammaRate + '0'
            epsilonRate = epsilonRate + '1'
        }

    }
    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}


const binaryDiagnosticPart2 = (input) => {
    const binaryLength = input[0].length
    let oxygenData = input
    let co2Data = input

    for (let i = 0; i < binaryLength; i++) {

        // Calculate Oxygen

        let onesOxygen = 0
        let zerosOxygen = 0
        // count ones and zeros for given position
        for (let j = 0; j < oxygenData.length; j++) {
            if (oxygenData[j][i] === '1') {
                onesOxygen += 1
            } else {
                zerosOxygen += 1
            }
        }
        if (oxygenData.length !== 1) {
            if ((onesOxygen > zerosOxygen || onesOxygen === zerosOxygen) && oxygenData !== 1) {
                // remove numbers that have 0 at bit position i for this number (j)   
                oxygenData = oxygenData.filter((num) => num[i] === '1')
            } else {
                // remove numbers that have 1 at this bit
                oxygenData = oxygenData.filter((num) => num[i] === '0')
            }
        }

        // Calculate Co2

        let onesCo2 = 0
        let zerosCo2 = 0
        // count ones and zeros for given position
        for (let j = 0; j < co2Data.length; j++) {
            if (co2Data[j][i] === '1') {
                onesCo2 += 1
            } else {
                zerosCo2 += 1
            }
        }

        if (co2Data.length !== 1) {
            if ((onesCo2 > zerosCo2 || onesCo2 === zerosCo2)) {
                // remove numbers that have 0 at bit position i for this number (j)   
                co2Data = co2Data.filter((num) => num[i] === '0')
            } else {
                // remove numbers that have 1 at this bit
                co2Data = co2Data.filter((num) => num[i] === '1')
            }
        }

    }

    const lifeSupportRating = parseInt(oxygenData[0], 2) * parseInt(co2Data[0], 2)

    return lifeSupportRating
}




function convertInput() {
    return fs
        .readFileSync("Day3/Day3.txt", "utf-8")
        .split("\n")
}
const puzzleInput = convertInput()

// console.log(binaryDiagnosticPart1(puzzleInput), "answer")
console.log(binaryDiagnosticPart2(puzzleInput), "answer")