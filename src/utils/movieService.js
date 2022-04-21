
const { Worker } = require('worker_threads');
 

module.exports =  {
    async run() {
      return new Promise((resolve, reject) => {
        const worker = new Worker('./src/service.js');
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        })
      })
  }
}
 



