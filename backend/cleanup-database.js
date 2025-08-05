const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://restaurant:restaurant123@cluster0.4qdt1n9.mongodb.net/restaurant?retryWrites=true&w=majority';

async function cleanupDatabase() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully!');

        // Import models
        const Order = require('./models/Order');
        const Bill = require('./models/Bill');
        const Feedback = require('./models/Feedback');

        console.log('🗑️  Starting database cleanup...');

        // Delete all orders
        const orderResult = await Order.deleteMany({});
        console.log(`✅ Deleted ${orderResult.deletedCount} orders`);

        // Delete all bills
        const billResult = await Bill.deleteMany({});
        console.log(`✅ Deleted ${billResult.deletedCount} bills`);

        // Delete all feedback
        const feedbackResult = await Feedback.deleteMany({});
        console.log(`✅ Deleted ${feedbackResult.deletedCount} feedback entries`);

        const totalDeleted = orderResult.deletedCount + billResult.deletedCount + feedbackResult.deletedCount;
        console.log(`\n🎉 Database cleanup completed!`);
        console.log(`📊 Total records deleted: ${totalDeleted}`);
        console.log(`   - Orders: ${orderResult.deletedCount}`);
        console.log(`   - Bills: ${billResult.deletedCount}`);
        console.log(`   - Feedback: ${feedbackResult.deletedCount}`);

        console.log('\n✨ Database is now clean and ready for production!');

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    }
}

// Run the cleanup
cleanupDatabase(); 