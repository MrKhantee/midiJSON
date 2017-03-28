const fs = require('fs');
const path = require('path');

import { parseMidiFile } from './parser'

const pathToSampleMid = __dirname + '/sampleMidiFiles/sample2_bach.mid'

const isMidiFile = (firstFourBytes) => {
    return firstFourBytes.toString() === "MThd"
}

const file = fs.readFile(pathToSampleMid, (err, data) => {

    if (err) {

        throw err

    }

    const firstFourBytes = data.slice(0, 4)

    if (!isMidiFile(firstFourBytes)) {

        throw new Error("File is not a MIDI file!")

    } else {

        parseMidiFile(data)

    }

})