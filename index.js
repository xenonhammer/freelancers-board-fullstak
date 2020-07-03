const path = require('path')
const express = require('express')
const app = express();


const PORT = process.env.PORT || 8080;

app.use('/api/parse', require('./routes/parse.routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, ()=>console.log(`Сервер запущен. Ипользуется порт: ${PORT}`))
