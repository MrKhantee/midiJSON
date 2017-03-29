const fs = require('fs');
const path = require('path');

import { parseMidiFile } from './parser'

const pathToSampleMid = __dirname + '/sampleMidiFiles/sample2_bach.mid'

const isMidiFile = (firstEightBytes) => {
    const firstFourBytes = firstEightBytes.slice(0, 4).toString()
    const secondFourBytes = firstEightBytes.slice(4, 8).toString('hex')
    return firstFourBytes === "MThd" && secondFourBytes === '00000006'

}

const file = fs.readFile(pathToSampleMid, (err, data) => {

    if (err) {

        throw err

    }

    const firstEightBytes = data.slice(0, 8)

    if (!isMidiFile(firstEightBytes)) {

        throw new Error("File is not a MIDI file!")

    } else {

        parseMidiFile(data)

    }

})