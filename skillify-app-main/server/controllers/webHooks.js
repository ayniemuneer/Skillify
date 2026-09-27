import { verifyWebhook } from '@clerk/express/webhooks';
import User from '../models/User.js';

export const clerkWebHooks = async (req, res) => {
    try {
        const event = await verifyWebhook(req, {
            signingSecret: process.env.CLERK_WEBHOOK_SECRET,
        });

        const { type, data } = event;

        switch (type) {
            case 'user.created': {
                // Constraint: Login only through email
                const emailObj = data.email_addresses?.find(
                    (e) => e.id === data.primary_email_address_id
                );

                const email = emailObj?.email_address;

                // If no email exists (e.g. phone login), we do NOT create the user in our DB
                if (!email) {
                    return res.status(400).json({ message: "No email provided, user creation skipped." });
                }

                await User.create({
                    clerkId: data.id,
                    fullName: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    email: email, 
                    avatar: data.image_url || data.profile_image_url || '',
                });

                console.log(`User created: ${email}`);
                return res.status(200).json({ message: 'User created successfully' });
            }

            case 'user.updated': {
                const update = {};

                const emailObj = data.email_addresses?.find(
                    (e) => e.id === data.primary_email_address_id
                );
                
                // Only update email if it exists
                if (emailObj?.email_address) {
                    update.email = emailObj.email_address;
                }

                if (data.first_name || data.last_name) {
                    update.fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim();
                }

                if (data.image_url || data.profile_image_url) {
                    update.avatar = data.image_url || data.profile_image_url;
                }

                await User.findOneAndUpdate({ clerkId: data.id }, update);

                console.log(`User updated: ${data.id}`);
                return res.status(200).json({ message: 'User updated successfully' });
            }

            case 'user.deleted': {
                await User.findOneAndDelete({ clerkId: data.id });
                console.log(`User deleted: ${data.id}`);
                return res.status(200).json({ message: 'User deleted successfully' });
            }

            default:
                // Return 200 for unhandled events so Clerk doesn't retry
                return res.status(200).json({ message: 'Event ignored' });
        }
    } catch (err) {
        console.error('Webhook error:', err.message);
        return res.status(400).json({ message: 'Webhook verification failed', error: err.message });
    }
};