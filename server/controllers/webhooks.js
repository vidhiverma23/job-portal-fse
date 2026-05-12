import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    })

    const { data, type } = req.body

    console.log("Webhook triggered:", type)

    switch (type) {

      case "user.created":

        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ""
        }

        await User.create(userData)

        console.log("User inserted into MongoDB")

        break


      case "user.updated":

        const updatedUser = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url
        }

        await User.findByIdAndUpdate(data.id, updatedUser)

        console.log("User updated")

        break


      case "user.deleted":

        await User.findByIdAndDelete(data.id)

        console.log("User deleted")

        break

      default:
        console.log("Unhandled event:", type)
    }

    res.json({ success: true })

  } catch (error) {
    console.log("Webhook Error:", error.message)

    res.status(500).json({
      success: false,
      message: "Webhook Error"
    })
  }
}