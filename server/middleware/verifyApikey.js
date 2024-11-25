import UserModel from '../model/userModel.js';


export const verifyApiKey = async (req, res, next) => {
    try {
        const { apiKey } = req.query;
        console.log("API Key from request:", apiKey);
        if (!apiKey) {
            return res.status(401).json({ success: false, message: 'apiKey is required.' });
        }

        
        const user = await UserModel.findOne({ apiKey });
        if (!user) {
            return res.status(403).json({ success: false, message: 'Invalid or expired apiKey.' });
        }

        req.user = user; 
        console.log('Verified user:', user);

        next(); 
    } catch (error) {
        next(error);
    }
};

