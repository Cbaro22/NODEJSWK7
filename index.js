
 const express = require("express")

 const mongoose = require("mongoose")

const StudentItem = require("./studentItemtModel")


const server = express()


 server.use(express.json())
 const PORT = process.env.PORT || 7000

 
 const MONGODB_URL ="mongodb+srv://metakaro:metakaro@cluster0.nyedirh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

 mongoose.connect(MONGODB_URL)
 .then(() =>{
    console.log("MongooseDB connected...")

    server.listen(PORT, (req, resp) => {
        console.log(`Server connected on port ${PORT}`)
     })

 })

 server.get('/all-items', async (req, resp) => {

     const allItems = await StudentItem.find()

     resp.status(200).json({
        message:"Successful",
        allItems
    })
 })

 server.post('/add-item', async (req, resp) =>{
      const {itemName,description,locationFound,dateFound,claimed} = req.body

      if(!itemName || !description){
        return resp.status(404).json({
            message:"Please fill all field"
        })
      }

      const newItem = new StudentItem({itemName,description,locationFound,dateFound,claimed})

       await newItem.save()

       resp.status(200).json({
        message:"New item added successfully",
        newItem
       })
 })

 server.get('/unclaimed-items', async (req, resp) =>{

     
      const unclaimed = await StudentItem.find({claimed:false})
    
         resp.status(200).json({
          message:"The following are uncalimed items",
          unclaimed

        })
      

 })

 server.get('/one-item/:id', async (req, resp)=>{
    const  { id } = req.params

    const oneItem = await  StudentItem.findById(id)

    if(!oneItem){

      return resp.status(404).json({
        message:("Item not available")
      })
  
    }

    resp.status(200).json({
      message:"Item available",
      oneItem
    })
 })

 server.put('/update-item/:id', async (req,resp) =>{
         const {id} = req.params

        const {itemName,description, claimed,locationFound,dateFoud} = req.body

        const updatedItem = await StudentItem.findByIdAndUpdate(
          id, {itemName,description,claimed,locationFound,dateFoud},
              {new:true}
        )

        resp.status(201).json({
          message:"Successful update",
          updatedItem
        })
 })

server.patch('/edit-item/:id', async (req, resp) =>{
    const {id} = req.params

    const {description} = req.body
    
 const editedItem = await StudentItem.findById(id)

     if(editedItem){
      editedItem.description = description

      await editedItem.save()

        resp.status(200).json({

       message:"Successfully Edited",

       editedItem

     })} else{

      resp.status(404).json({
        message:"Product does not Exist"})}
})


 server.delete('/delete-item/:id', async (req, resp) =>{
       const {id} = req.params
      const deletedItem = await StudentItem.findById(id)

      

      resp.status(200).json({
        message:"Item deleted",
        deletedItem
      })
 })