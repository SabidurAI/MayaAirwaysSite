const express = require('express');
const app = express();
const fs = require('fs');
const { Client } = require('ssh2-sftp-client');

const sftp = new Client();

// Read environment variables or use default values
const sftpConfig = {
  host: process.env.SFTP_HOST || 'sabidurai.co',
  port: process.env.SFTP_PORT || '22',
  username: process.env.SFTP_USERNAME || 'dh_kttdbm',
  password: process.env.SFTP_PASSWORD || 'your_default_password'
};

app.get('/image', async (req, res) => {
  try {
    await sftp.connect(sftpConfig);

    const remoteFilePath = '/path/to/your/image.jpg';
    const image = await sftp.get(remoteFilePath);

    res.set('Content-Type', 'image/jpeg');
    res.send(image);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching image');
  } finally {
    await sftp.end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
