import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"


const sendMessage = async (req, res) => {
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
            conversation = await Conversation.create({
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

const getMessage = async (req, res) => {
    try {
        
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        if(!userToChatId){
            return res.status(400).json({ message: "Message ID is required" })
        }

        if(!senderId) {
            return res.status(401).json({ message: "Not authorized" })
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")

        if(!conversation) {
            return res.status(201).json([])
        }

        const messages = conversation.messages

        // res.status(200).json(conversation.messages)
        res.status(200).json(messages)

    } catch (error) {
        console.error("Error in getting message", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export {
    sendMessage,
    getMessage
 
}