const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check
app.all('/', (req, res) => {
    res.status(200).json({ retCode: 0, retMsg: "success", status: "OK" });
});

// 1. Sud.tech get_sstoken Callback
app.all('/get_sstoken', (req, res) => {
    let code = "default_test_code";
    if (req.body && typeof req.body === 'object' && req.body.code) {
        code = req.body.code;
    } else if (req.query && req.query.code) {
        code = req.query.code;
    }

    const uid = (req.body && req.body.uid) || (req.query && req.query.uid) || "user_amison_01";
    const expireDate = Date.now() + (24 * 60 * 60 * 1000);
    const tokenStr = "sstoken_" + Buffer.from(code + "_" + uid).toString('hex').slice(0, 32);

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
            ssToken: tokenStr,
            expireDate: expireDate
        },
        userInfo: {
            uid: String(uid),
            nickName: "AmisonUser",
            avatarUrl: "https://via.placeholder.com/150",
            gender: "male"
        },
        ssToken: tokenStr,
        expireDate: expireDate
    });
});

// 2. Sud.tech update_sstoken Callback
app.all('/update_sstoken', (req, res) => {
    console.log("Sud Update Token Body:", req.body);
    const uid = (req.body && req.body.uid) || (req.query && req.query.uid) || "user_amison_01";
    const expireDate = Date.now() + (24 * 60 * 60 * 1000);
    const tokenStr = "sstoken_updated_" + Buffer.from(uid + "_" + Date.now()).toString('hex').slice(0, 32);

    return res.status(200).json({
        retCode: 0,
        retMsg: "success",
        ret_code: 0,
        ret_msg: "success",
        data: {
            ssToken: tokenStr,
            expireDate: expireDate
        },
        ssToken: tokenStr,
        expireDate: expireDate
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Amison server running on port ${PORT}`);
});
