import Converters from '../src/converters'

describe('Converters work as expected', () => {

    test('bufferToDec correctly converts buffer to Decimal', () => {

        const buffer = new Buffer("250001000192CD0000002F6D6E742F72", "hex")

        expect(Converters.bufferToDec(buffer.slice(0, 2))).toBe(9472)
        expect(Converters.bufferToDec(buffer.slice(10, 20))).toBe(52147051048818)
    })

    test('buffer converter methods work as expected', () => {

        const buffer = new Buffer("250001000192CD0000002F6D6E742F72", "hex")

        expect(Converters.bufferToDecStr(buffer.slice(0, 2))).toBe('9472')
        expect(Converters.bufferToDecStr(buffer.slice(10, 20))).toBe('52147051048818')
        expect(Converters.bufferToBinStr(buffer.slice(0, 6))).toBe('1001010000000000000001000000000000000110010010')

    })

    test('misc converters work as expected', () => {

        expect(Converters.bin2HexStr('101010111010001')).toBe('55d1')
        expect(Converters.bin2HexStr(101010111010001)).toBe('55d1')

        expect(Converters.dec2BinStr(65582)).toBe('10000000000101110')
        expect(Converters.dec2HexStr(983525)).toBe('f01e5')
        expect(Converters.dec2BinStr(8324820)).toBe('11111110000011011010100')

        expect(Converters.hex2Dec('4d')).toBe(77)
        expect(Converters.hex2Dec('4d')).not.toBe(76)
        expect(Converters.hex2Dec('EFFB5584')).toBe(4026226052)
        expect(Converters.hex2BinStr('4d')).toBe('1001101')

    })

})

