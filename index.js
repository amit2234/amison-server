const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.all('/', (req, res) => {
    res.status(200).json({ retCode: 0, retMsg: "success", status: "OK" });
});

// Sud.tech Official get_sstoken Callback
app.all('/get_sstoken', (req, res) => {
    console.log("Sud Request Body:", req.body);
    console.log("Sud Request Query:", req.query);

    const code = (req.body && req.body.code) || req.query.code || "test_code";
    const uid = (req.body && req.body.uid) || req.query.uid || "test_user_01";

    const expireDate = Date.now() + (2 * 60 * 60 * 1000); // 2 hours validity

    // Standard Sud.tech API format (dono structures match karne ke liye)
    return res.status(200).json({
        retCode: 0,
        retMsg: "success",
        ret_code: 0,
        ret_msg: "success",
        data: {
            userInfo: {
                uid: String(uid),
                nickName: "AmisonUser",
                avatarUrl: "https://via.placeholder.com/150",
                gender: "male"
            },
            ssToken: "sstoken_" + Buffer.from(code + "_" + uid).toString('hex').slice(0, 32),
            expireDate: expireDate
        },
        userInfo: {
            uid: String(uid),
            nickName: "AmisonUser",
            avatarUrl: "https://via.placeholder.com/150",
            gender: "male"
        },
        ssToken: "sstoken_" + Buffer.from(code + "_" + uid).toString('hex').slice(0, 32),
        expireDate: expireDate
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
