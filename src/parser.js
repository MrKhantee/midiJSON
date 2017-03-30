import Converters from './converters'
import ChunksTodoMaker from './chunksTodoMaker'

const bigJson = {}

const parseMThdHeader = (data) => {

    // I don't implement the possible cases for larger than 6 bytes for the slice(4, 8)

    const formatAsInt = Converters.bufferToDec(data.slice(8, 10))
    const numberOfChannels = Converters.bufferToDec(data.slice(10, 12))

    bigJson['typeOfMidiFile'] = formatAsInt
    bigJson['numberOfChannels'] = numberOfChannels

    const fullBinaryDivisionStr = Converters.bufferToBinStrFull(data.slice(12, 14))
    const firstBit = fullBinaryDivisionStr[0]
    if (firstBit === '0') {
        bigJson['pulsesPerQuarterNote'] = Converters.getPulsesPerQuarterNote(fullBinaryDivisionStr)
    } else {
        bigJson['millisecondTiming'] = Converters.getTicksPerSecond(fullBinaryDivisionStr)
    }

}

export const parseMidiFile = (data) => {

    parseMThdHeader(data)

    const bufferSizeInBytes = data.length
    bigJson['byteSizeOfOriginalMidiFile'] = bufferSizeInBytes

    const chunksTodo = ChunksTodoMaker.makeChunksTodo(data, bufferSizeInBytes)

    console.log(chunksTodo)
    console.log(bigJson)
}