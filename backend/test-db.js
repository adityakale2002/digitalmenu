const mongoose = require('mongoose');

// Test MongoDB connection
const testConnection = async () => {
    try {
        console.log('🔄 Testing MongoDB connection...');
        
        // Try the current connection string
        const MONGODB_URI = 'mongodb+srv://restaurant:restaurant123@cluster0.4qdt1n9.mongodb.net/restaurant?retryWrites=true&w=majority';
        
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connection successful!');
        
        // Test database operations
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📊 Available collections:', collections.map(c => c.name));
        
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        console.log('💡 Please check your MongoDB credentials');
    }
};

testConnection(); 