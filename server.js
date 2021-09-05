import express from 'express'

const app = express()
const PORT = 5000

app.set('view engine',"ejs")

app.get('/',(req,res)=>{
    res.send("Hello fuck!")
})


app.listen(PORT,()=>{
    console.log(`Listening at port: ${PORT}`)
})
