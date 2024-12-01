const cloudinary = require('cloudinary').v2;


  
    cloudinary.config({ 
        cloud_name: 'dflxpcdxz', 
        api_key: '574832531237765', 
        api_secret: 'wNihdQZ-ZC2TlEDNX7KIxyo8W00'
    });

module.exports = cloudinary;