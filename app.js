const { createTransport } = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const readCsv = require('csv-reader');
const { createReadStream } = require('fs');
const { NAME, IMAGE, IMAGE_PATH, EMAIL, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = require("./utils/constants");
const { oAuth2Client } = require("./utils/oAuth");
const { CSV } = require('./utils/constants');

const csv = createReadStream(CSV, 'utf8');

const sendMail = async (email) => {
  try {
    const accessToken = oAuth2Client.setCredentials({ refreshToken: REFRESH_TOKEN });
    const htmlContent = `
            <p>Testing embedding image as cid</p>
              <img
          alt=""
          src="cid:test"
          style="
              display: block;
              padding: 0px;
              max-width: 100%;
              text-align: center;
          "
          data-bit="iit"
      />
            `;
    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      sendMail: true
    });

    transport.use('compile', inlineBase64({ cidPrefix: 'cid:' }));

    const mailOptions = {
      from: `${NAME} <${EMAIL}>`,
      to: email,
      subject: 'Test',
      text: 'Hello',

      html: htmlContent,
      attachments: [
        {
          filename: IMAGE,
          path: IMAGE_PATH,
          cid: 'test',
        },
      ],
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

csv.pipe(new readCsv({ parseNumbers: true, trim: true }))
  .on('data', async (row) => {
    console.log('Record: ', row);
    try {
      const result = await sendMail(row[0]);
      if (result) {
        console.log('Email sent to: ', row[0]);
      }
    } catch (err) {
      console.log('Failed to send mail to: ', row[0]);
      console.log(err);
    }
  })
  .on('end', () => console.log('Finished...'));