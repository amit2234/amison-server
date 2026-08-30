const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check
app.all('/', (req, res) => {
    res.status(200).json({ status: "ok", message: "Amison Game Server is Live!" });
});

// Sud.tech Official Verification & get_sstoken Callback
app.all('/get_sstoken', (req, res) => {
    console.log("Sud.tech verification/callback headers:", req.headers);
    console.log("Sud.tech verification/callback body:", req.body);
    console.log("Sud.tech verification/callback query:", req.query);

    const code = (req.body && req.body.code) || req.query.code || "test_code_12345";
    const uid = (req.body && req.body.uid) || req.query.uid || "user_test_001";

    // Official Sud.tech Response Format
    return res.status(200).json({
        ret_code: 0,
        ret_msg: "SUCCESS",
        data: {
            user_info: {
                uid: String(uid),
                nick_name: "AmisonPlayer",
                avatar_url: "https://via.placeholder.com/150",
                gender: "male"
            },
            sstoken: "sstoken_" + Buffer.from(code + Date.now()).toString('hex').slice(0, 32)
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
