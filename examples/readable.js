const { Readable } = require('stream')

class MyStream extends Readable {
  #count = 0
  _read(size) {
    // Set immediate makes the stream more asychronous, so push to stream and then go back to consumer
    setImmediate(() => {
       
        this.push(':-)')
        if (this.#count++ === 5) { 
            // stream ends when you push null
            this.push(null)
        }
    })
     
  }
}


// const stream = new MyStream()
// // no backpressure applied on data, data goes as fast as it can to consumer
// stream.on('data', chunk => {
//     console.count('>> readable event')
//     console.log(chunk.toString())
//     // applying simple backpressure on consumer by 1 second and no constraint backpreasure
//     // stream.pause()
//     // setTimeout(() => {stream.resume()}, 1000)

// })

// stream.on('end', () => console.log('stream ended'))

const stream = new MyStream({
    highWaterMark: 0,
    objectMode: true
})

// stream readable allows us to control when to 
stream.on("readable", () => {
    console.count('>> readable event')
    let chunk
    while((chunk = stream.read()) !== null) {
        console.log(chunk.toString())
    }
})