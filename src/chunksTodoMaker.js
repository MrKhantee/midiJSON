export default class ChunkTodoListMaker {

    static makeChunksTodo(data, bufferSizeInBytes) {

        const chunksToProcess = {}
        let byteIndex = 0
        let previousChunkStartByteIndex

        while (byteIndex < bufferSizeInBytes) {

            if (ChunkTodoListMaker.byteIsBeginningOfAnMTrkChunk(data, byteIndex, bufferSizeInBytes)) {

                if (previousChunkStartByteIndex) {
                    chunksToProcess['chunkAt' + previousChunkStartByteIndex]['endByteExclusive'] = byteIndex
                }

                previousChunkStartByteIndex = byteIndex

                chunksToProcess['chunkAt' + byteIndex] = {
                    startByteInclusive: byteIndex
                }
            }

            byteIndex++
        }

        chunksToProcess['chunkAt' + previousChunkStartByteIndex].endByteExclusive = bufferSizeInBytes

        return chunksToProcess

    }

    static byteIsBeginningOfAnMTrkChunk(data, byteIndex, bufferSizeInBytes) {

        if (byteIndex < bufferSizeInBytes - 4) {
            if (
                String.fromCharCode(data[byteIndex]) === 'M' &&
                String.fromCharCode(data[byteIndex + 1]) === 'T' &&
                String.fromCharCode(data[byteIndex + 2]) === 'r' &&
                String.fromCharCode(data[byteIndex + 3]) === 'k'
            ) { return true }
        }

        return false

    }


}