export default class Converters {

    static checkBin(n) { return/^[01]{1,64}$/.test(n) }
    static checkDec(n) { return/^[0-9]{1,64}$/.test(n) }
    static checkHex(n) { return/^[0-9A-Fa-f]{1,64}$/.test(n) }

    static dec2BinStr(n) { if (!this.checkDec(n) || n < 0) return 0; return n.toString(2) }
    static dec2HexStr(n) { if (!this.checkDec(n) || n < 0) return 0; return n.toString(16) }

    static bin2Dec(n) { if (!this.checkBin(n)) return 0; return parseInt(n, 2) }
    static bin2DecSigned(n) { if (!this.checkBin(n)) return 0; return (n.substr(0,1) === '1' ? '-':'+') + parseInt(n.substr(1),2) }
    static bin2DecStr(n) { return this.bin2Dec(n).toString(10) }
    static bin2HexStr(n) { if (!this.checkBin(n)) return 0; return parseInt(n, 2).toString(16) }

    static hex2BinStr(n) { if (!this.checkHex(n)) return 0; return parseInt(n, 16).toString(2) }
    static hex2BinStrFull(n) {

        const binStr = this.hex2BinStr(n)
        const binStrLen = binStr.length
        const remainder = binStrLen % 8
        if (remainder) {
            let zeroStringPrefix = ''
            const makeup = 8 - remainder
            for (let i = 0; i < makeup; i++) zeroStringPrefix += '0'
            return zeroStringPrefix + binStr
        } else {
            return binStr
        }

    }
    static hex2Dec(n) { if (!this.checkHex(n)) return 0; return parseInt(n, 16) }
    static hex2DecStr(n) { return this.hex2Dec(n).toString(10) }

    static bufferToDec(buffer) { return this.hex2Dec(buffer.toString('hex')) }
    static bufferToDecStr(buffer) { return this.bufferToDec(buffer).toString(10) }

    static bufferToBinStrFull(buffer) { return this.hex2BinStrFull(buffer.toString('hex')) }

    static getPulsesPerQuarterNote(bitString) { return this.bin2Dec(bitString) }

    static unsignedDecToSigned(uint, nbit) {
        nbit = +nbit || 32;
        if (nbit > 32) throw new RangeError('unsignedDecToSigned only supports ints up to 32 bits');
        uint <<= 32 - nbit;
        uint >>= 32 - nbit;
        return uint;
    }


    static getTicksPerSecond(bitString) {

        const firstEightAsUnsignedInt = this.bin2Dec(bitString.slice(0, 8))
        const firstEightAsSignedInt = this.unsignedDecToSigned(firstEightAsUnsignedInt, 8)
        const framesPerSecond = Math.abs(firstEightAsSignedInt)
        const ticksPerFrame = this.bin2Dec(bitString.slice(8, 16))
        const ticksPerSecond = framesPerSecond * ticksPerFrame
        return ticksPerSecond

    }

}