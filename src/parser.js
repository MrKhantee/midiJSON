import Converters from './converters'

const bigJson = {}

const parseMThdHeader = (data) => {

    const lengthOfMThd = Converters.bufferToDec(data.slice(4, 8))

    const formatAsInt = Converters.bufferToDec(data.slice(8, 10))
    const numberOfChannels = Converters.bufferToDec(data.slice(10, 12))

    bigJson['typeOfMidiFile'] = formatAsInt
    bigJson['numberOfChannels'] = numberOfChannels

    const figureOut = Converters.bufferToBinStr(data.slice(12, 14))

}

export const parseMidiFile = (data) => {

    parseMThdHeader(data)

    for (let i = 0; i < 10; i++) {
        console.log(data[i].toString(16))
    }









    console.log(bigJson)
}