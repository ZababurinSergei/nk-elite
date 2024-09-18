import { lpStream } from 'it-length-prefixed-stream'
import * as cbor from 'cborg'

export const structureData = async function (node, ma, protocol) {

    const signal = AbortSignal.timeout(1000)

    const stream = await node.dialProtocol(ma, protocol, {
        signal
    })

    const bytes = lpStream(stream)
    const val = await bytes.read({
        signal
    })
    const request = cbor.decode(val.slice())
    const response = cbor.encode({
        type: 'RESPONSE',
        answer: request.challenge.split('').reverse().join('')
    })

    await bytes.write(response, {
        signal
    })

    await stream.close()
}