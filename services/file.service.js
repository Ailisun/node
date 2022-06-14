const fs = require('fs')

// fs.appendFile('./data.txt', 'hello node', err => {
//     if(err){
//         console.log(err)
//     }
// })
// він дописує до існуючого файла, або створює файл

// fs.writeFile('./data.txt', 'hello node', err => {
//     if(err){
//         console.log(err)
//     }
// })
// перезаписує всю інформацію, що була у файлі до цього і записує свою інфу

// fs.readFile('./data.txt', (err, data) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(data)// поверне buffer машину мову
//     console.log(data.toString()) // по православному
// })

// fs.readdir('./', (err, files) => {
//     if(err) {
//         console.log(err)
//         return
//     }
//
//     for (const file of files) {
//         console.log(file);
//
//         fs.stat(`./${file}`, (err1, stats) => {
//             console.log(stats.isFile())
//             console.log(stats.isDirectory())
//         })
//         // fs.readFile(`./service/${file}`, (err1, data) => {
//         //     if(err1) {
//         //         console.log(err1)
//         //         return
//         //     }
//         //     console.log(data.toString())
//         // })
//     }
// })

//створити директорію
// fs.mkdir('./utils', err => {
//     err && console.log(err)
// })

//перемістити та розширити
// fs.rename('./services/toMove.js', './utils/helloWorld.txt', err => {
//     err && console.log(err)
// })


//cтріми
//цей варіант прочитати і записати краще використовувати, тільки щоб прочитати
const readStream = fs.createReadStream('./utils/helloWorld.txt')
readStream.on('data', chunk => {
    console.log(chunk)
})

const writeStream = fs.createWriteStream('./utils/helloWorld2.txt')
readStream.on('data', chunk => {
    console.log(chunk)

    writeStream.write(chunk)
})


//в реальності - синхронізація, всі чанки запишуться. Краще всього так писати стріми через pipe:
readStream.pipe(writeStream)
//
readStream.on('end', () => {
    console.log('file done');
})