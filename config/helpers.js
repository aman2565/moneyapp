const FCM = require('fcm-node');
var path = require('path');

const nodemailer = require('nodemailer');
const mailAuth = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
      user: 'xxxxx',
      pass: 'xx'
    }
};
// var mailer = require('express-mailer');
// mailer.extend(app, {
//     from: 'Easy Come <cqlsystest52@gmail.com>',
//     host: 'smtp.gmail.com', // hostname
//     secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//     transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//     auth: {
//         user: '',
//         pass: ''
//     }
// });


module.exports = {
    sendFCMnotification: function (deviceTokens, data) {
        var serverKey = 'AAAAI0h8Ybo:APA91bG4MqxUnGqVWM2fU4MTw7UbnYbM88DSMpnPPHVkVTgY6g8FWzBay2SXjAA2tYgSL32hj-2Pyp4jFlQBGNOmNx6LubTCe4gKpSRIxlJXL4O32JzybYRWS1QzlLHji2i6Hw9xvobC'; //put your server key here
        var fcm = new FCM(serverKey);

        data.title = 'EasyCome.IT';
        var message = { 
            registration_ids: deviceTokens, 
            collapse_key: 'your_collapse_key',
            data: data,
        };
        message.notification = {
            title: data.message,
            badge: 1,
            sound: "default",
            priority: "high",
        }
        console.log('======================Ios',message);
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    },

    sendFCMnotificationAndroid: function (deviceTokens, data) {
        var serverKey = 'AAAAI0h8Ybo:APA91bG4MqxUnGqVWM2fU4MTw7UbnYbM88DSMpnPPHVkVTgY6g8FWzBay2SXjAA2tYgSL32hj-2Pyp4jFlQBGNOmNx6LubTCe4gKpSRIxlJXL4O32JzybYRWS1QzlLHji2i6Hw9xvobC'; //put your server key here
        var fcm = new FCM(serverKey);

        data.title = 'EasyCome.IT';
        var message = { 
            registration_ids: deviceTokens, 
            collapse_key: 'your_collapse_key',
            data: data,
        };
        console.log('======================android',message);
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    },

    fileUpload(image, folder = 'uploads') {
        if (image) {
            var extension = path.extname(image.name);  
            var filename = new Date().getTime() + extension;
            var sampleFile = image;
            // console.log(filename, "==========filename"); 
            sampleFile.mv(`public/${folder}/${filename}`, function(err) { 
                if (err) throw err;
            });
            return filename;
        }
    },

    async fileUpload2(image, folder = 'uploads') {
        if (image) {
            var extension = path.extname(image.name);  
            var filename = new Date().getTime() + extension;
            var sampleFile = image;
            // console.log(filename, "==========filename"); 

            // console.log('here 1');
            
            // console.log(filename, '=========>fileName');

           return await new Promise ((resolve, reject) => {
                sampleFile.mv(`public/${folder}/${filename}`, function(err) { 
                    if (err) throw reject(err);
                    // console.log('here 2');
                    resolve(filename);
                });
            });
            
            
        }
    },

    toBase64 (file ) {
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    },

    error(res,err, body = {}) {
		// console.log(err, '===========================>error');
        let code=(typeof err==='object') ? (err.code) ? err.code : 400 : 400;
        let message=(typeof err==='object')? (err.message ? err.message : '') : err;
        return res.status(code).json({
            'success': false,
            'status': code,
            'message': message,
            'body': body
        });
	},

    success(res,message,body = {}) {
		// console.log(err, '===========================>error');
        return res.status(200).json({
            'success': true,
            'status': 200,
            'message': message,
            'body': body
        });
	},

    // sendEmailData(object) {
    //     try {
    //         var mailOptions = object.mail;
    //         app.mailer.send(object.htmlCode, mailOptions, function (err, message) {
    //             if (err) {
    //                 console.log('There was an error sending the email'+err)
    //             }else{
    //                 console.log("Mail sent to user");
    //             }                                
    //         })
    //     } catch (err) {
    //         throw err;
    //     }
    // },

    sendEmail(object) {
        try {
            var transporter = nodemailer.createTransport(mailAuth);
            var mailOptions = object;

            // console.log(constants.mail_auth);
            // console.log(mailOptions);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('error', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } catch (err) {
            console.log('---err',err)
            throw err;
        }
    },
}