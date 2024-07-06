import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"


const sendMessage = async () => {
    try {
        
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        if(!message){
            return res.status(400).json({ message: "Message is required" })
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if(!conversation){
            conversation = Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)

    } catch (error) {
        console.error("Error sending message", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export {
    sendMessage
 
}