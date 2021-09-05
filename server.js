import express from 'express'

const app = express()
const PORT = 5000

app.set('view engine',"ejs")
app.use(express.static('public'))
app.get('/',(req,res)=>{
    const code = `Welcome to WasteBin
    
Use the commands in the top right corner
to create a new file to share with others`
    res.render('code-display',{code:code,lineNumbers:code.split('\n').length})
})

//Create New Document
app.get('/new',(req,res)=>{
    res.render("new")
})


app.listen(PORT,()=>{
    console.log(`Listening at port: ${PORT}`)
})
