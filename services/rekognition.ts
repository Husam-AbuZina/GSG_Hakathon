const AWS = require('aws-sdk');

const s3 = new AWS.S3();

(async () => {
    await s3
        .putObject({
            Body: 'turn into image once this work',
            Bucket: "legends-bucket", //bucket-test-az
            Key: "my-file3.txt",
        }).promise();
})();

