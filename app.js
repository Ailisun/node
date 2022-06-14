const fs = require('fs')
const path = require('path')

//Дублюється код, нижче буде динамічний варіант
// const sortBoys = () => {
//     fs.readdir('./boys', (err, files) => {
//         if (err) {
//             return console.log(err)
//         }
//         files.forEach((file) => {
//             const readFolderPath = path.join(__dirname, 'boys', file)
//
//             fs.readFile(readFolderPath, (err1, data) => {
//                 if (err1) return console.log(err1)
//
//                const user = JSON.parse(data.toString())
//                 if (user.gender === 'female'){
//                     fs.rename(readFolderPath, path.join(__dirname, 'girls', file), (err) => {
//                         if (err) return console.log(err)
//
//                     })
//                 }
//
//             })
//         })
//     })
// }
//
// sortBoys()



// const sortGirls = () => {
//     fs.readdir('./girls', (err, files) => {
//         if (err) {
//             return console.log(err)
//         }
//         files.forEach((file) => {
//             const readFolderPath = path.join(__dirname, 'girls', file)
//
//             fs.readFile(readFolderPath, (err1, data) => {
//                 if (err1) return console.log(err1)
//
//                 const user = JSON.parse(data.toString())
//                 if (user.gender === 'male'){
//                     fs.rename(readFolderPath, path.join(__dirname, 'boys', file), (err) => {
//                         if (err) return console.log(err)
//
//                     })
//                 }
//
//             })
//         })
//     })
// }

// sortGirls()

//Варіант 2
const sortFiles = (read,gender, location) => {
    fs.readdir(path.join(__dirname, read), (err, files) => {
        if (err) {
            return console.log(err)
        }
        files.forEach((file) => {
            const readFolderPath = path.join(__dirname, read, file)

            fs.readFile(readFolderPath, (err1, data) => {
                if (err1) return console.log(err1)

                const user = JSON.parse(data.toString())
                if (user.gender === gender){
                    fs.rename(readFolderPath, path.join(__dirname, location, file), (err) => {
                        if (err) return console.log(err)

                    })
                }

            })
        })
    })
}

sortFiles('girls', 'male', 'boys')
sortFiles('boys', 'female', 'girls')