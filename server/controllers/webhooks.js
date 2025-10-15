import { Webhook } from "svix";
import User from "../models/User.js";

//Api Controller Function to manage Clerk User with database

export const clerkWebhooks=async(req,res)=>{
    console.log("Webhook received!");
    try {
        //create a svix instance with clerk webhook instance
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        
        // Convert raw body to string
        const payload = req.body.toString();
        
        //verifying headers
        await whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        
        //Get data from request body (parse the JSON)
        const {data, type} = JSON.parse(payload);
        
        //Switch case for Different event 
        switch (type) {
            case 'user.created':{
                const userData={
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,
                    resume:'' 
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated':{
                 const userData={
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,  // FIXED: was image_urllll
                }
                await User.findByIdAndUpdate(data.id, userData);
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id);
                res.json({})
                break;
            }
            default:
                res.json({})
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:'Webhook Error'})
    }
}