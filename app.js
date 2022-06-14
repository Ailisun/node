// const fs = require('fs')
// const path = require('path')

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
// const sortFiles = (read,gender, location) => {
//     fs.readdir(path.join(__dirname, read), (err, files) => {
//         if (err) {
//             return console.log(err)
//         }
//         files.forEach((file) => {
//             const readFolderPath = path.join(__dirname, read, file)
//
//             fs.readFile(readFolderPath, (err1, data) => {
//                 if (err1) return console.log(err1)
//
//                 const user = JSON.parse(data.toString())
//                 if (user.gender === gender){
//                     fs.rename(readFolderPath, path.join(__dirname, location, file), (err) => {
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
// sortFiles('girls', 'male', 'boys')
// sortFiles('boys', 'female', 'girls')

//Варіант 3 через проміси
const fs = require('fs/promises');
const path = require('path');

const sortFolder = async (read, gender, location) => {
    try {
        const files = await fs.readdir(path.join(__dirname, read));

        for (const file of files) {
            const redFolderPath = path.join(__dirname, read, file);
            const data = await fs.readFile(redFolderPath);
            const user = JSON.parse(data.toString());

            if (user.gender === gender) {
                await fs.rename(redFolderPath, path.join(__dirname, location, file));
            }
        }
    }catch (e) {
        console.error(e);
    }
}

sortFolder('girls', 'male', 'boys');
sortFolder('boys', 'female', 'girls');