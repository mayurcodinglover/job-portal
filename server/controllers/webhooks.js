import { Webhook } from "svix";
import User from "../models/User.js";

//Api Controller Function to manage Clerk User with database

export const clerkWebhooks = async (req, res) => {
    console.log("Webhook called");
    
    try {
        // Create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Get the raw body as string
        const payload = Buffer.isBuffer(req.body) 
            ? req.body.toString('utf8') 
            : JSON.stringify(req.body);
        
        // Verify the webhook signature
        const evt = whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        
        // evt is the verified and parsed JSON object
        const { data, type } = evt;

        console.log("Event type:", type);

        // Switch case for Different events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    image: data.image_url,
                    resume: '' 
                }
                await User.create(userData);
                console.log("User created:", userData._id);
                return res.status(200).json({ success: true });
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData);
                console.log("User updated:", data.id);
                return res.status(200).json({ success: true });
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                console.log("User deleted:", data.id);
                return res.status(200).json({ success: true });
            }
            
            default:
                console.log("Unhandled event type:", type);
                return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
}