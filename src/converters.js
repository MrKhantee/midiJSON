export default class Converters {

    static checkBin(n) { return/^[01]{1,64}$/.test(n) }
    static checkDec(n) { return/^[0-9]{1,64}$/.test(n) }
    static checkHex(n) { return/^[0-9A-Fa-f]{1,64}$/.test(n) }

    static dec2BinStr(n) { if (!this.checkDec(n) || n < 0) return 0; return n.toString(2) }
    static dec2HexStr(n) { if (!this.checkDec(n) || n < 0) return 0; return n.toString(16) }

    static bin2Dec(n) { if (!this.checkBin(n)) return 0; return parseInt(n, 2) }
    static bin2DecStr(n) { return this.bin2Dec(n).toString(10) }
    static bin2HexStr(n) { if (!this.checkBin(n)) return 0; return parseInt(n, 2).toString(16) }

    static hex2BinStr(n) { if (!this.checkHex(n)) return 0; return parseInt(n, 16).toString(2) }
    static hex2Dec(n) { if (!this.checkHex(n)) return 0; return parseInt(n, 16) }
    static hex2DecStr(n) { return this.hex2Dec(n).toString(10) }

    static bufferToDec(buffer) { return this.hex2Dec(buffer.toString('hex')) }
    static bufferToDecStr(buffer) { return this.bufferToDec(buffer).toString(10) }

    static bufferToBinStr(buffer) { return this.hex2BinStr(buffer.toString('hex')) }

}