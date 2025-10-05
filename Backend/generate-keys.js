import crypto from 'crypto';

// Generate a secure encryption key and IV
const generateKeys = () => {
    // Generate a 32-byte key (256 bits)
    const key = crypto.randomBytes(32).toString('hex');
    
    // Generate a 16-byte IV (128 bits)
    const iv = crypto.randomBytes(16).toString('hex');
    
    return {
        key,
        iv
    };
};

const { key, iv } = generateKeys();
console.log('Add these to your .env file:');
console.log(`ENCRYPTION_KEY=${key}`);
console.log(`ENCRYPTION_IV=${iv}`);