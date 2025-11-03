import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        // Create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Convert raw body to string for verification
        const payload = req.body.toString();
        
        // Verify Headers
        await whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        
        // Parse the verified payload
        const { data, type } = JSON.parse(payload);

        console.log("Event type:", type);

        // Switch case for Different events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: '' 
                }
                await User.create(userData);
                res.json({ success: true });
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData);
                res.json({ success: true });
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({ success: true });
                break;
            }
            
            default:
                res.json({ success: true });
                break;
        }
    } catch (error) {
        console.log("Webhook error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}