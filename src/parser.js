import Converters from './converters'
import TracksTodoMaker from './tracksTodoMaker'

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
        bigJson['ticksPerSecond'] = Converters.ppqnToTicksPerSecond(bigJson.pulsesPerQuarterNote)
    } else {
        bigJson['ticksPerSecond'] = Converters.getTicksPerSecond(fullBinaryDivisionStr)
    }

}

export const parseMidiFile = (data) => {

    parseMThdHeader(data)

    const bufferSizeInBytes = data.length
    bigJson['byteSizeOfOriginalMidiFile'] = bufferSizeInBytes

    const tracksTodo = TracksTodoMaker.makeTracksTodo(data, bufferSizeInBytes)

    Object.keys(tracksTodo).forEach((trackKey, index) => {

        const track = tracksTodo[trackKey]

        // const parsedTrack = TrackParser.parseTrack(track, data.slice(track.startByteInclusive, track.endByteExclusive))

    })

    console.log(bigJson)
}