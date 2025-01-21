import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, { timestamps: true, versionKey: false })

const SubscriptionModel = mongoose.model.subscription || mongoose.model('subscription', subscriptionSchema);
export default SubscriptionModel