const express = require('express');
const cors = require('cors');
const CryptoJS = require('crypto-js');

const app = express();
app.use(cors());
app.use(express.json());

// ZEGO Credentials
const ZEGO_APP_ID = 991659497;
const ZEGO_SERVER_SECRET = "573b4a3473df8dee343211442464975c";

// Home Health Check Route
app.get('/', (req, res) => {
    res.json({ status: "ok", message: "Amison Game Server is Live & Running!" });
});

// Sud.tech Verification & get_sstoken Callback
app.all('/get_sstoken', (req, res) => {
    console.log("Sud.tech get_sstoken request received:", req.body || req.query);
    
    // Sud.tech verification ke liye standard success format
    const code = (req.body && req.body.code) || req.query.code || "test_code";
    
    res.json({
        ret_code: 0,
        ret_msg: "success",
        data: {
            user_info: {
                uid: "user_" + Date.now(),
                nickname: "AmisonUser",
                avatar_url: "https://via.placeholder.com/150"
            },
            token: "sstoken_" + CryptoJS.MD5(code + ZEGO_SERVER_SECRET).toString()
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});