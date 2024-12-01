import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const FetchImageFromS3 = ({ bucketName, imageKey }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Configure AWS SDK
        const s3 = new AWS.S3({
          accessKeyId: 'AKIARFVXKBW2POPZFF2Q',
          secretAccessKey: 'VKpsoTFWOgor6w9Ihm2FgonB8UXQgxfDWnLTRxxs',
          region: 'ap-northeast-1', // Example: 'us-east-1'
        });

        // Generate a signed URL to fetch the image
        const params = {
          Bucket: bucketName,
          Key: imageKey,
          Expires: 60, // URL expiry time in seconds
        };

        const url = s3.getSignedUrl('getObject', params);

        console.log('Signed URL:', imageKey);
        setImageUrl(url);
      } catch (err) {
        console.error('Error fetching image from S3:', err);
        setError('Unable to fetch the image. Please try again.');
      }
    };

    fetchImage();
  }, [bucketName, imageKey]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Image"  style={{ width: "100%", objectPosition: "center", objectFit: "cover", borderRadius: "10px" }} />
      ) : (
         <img src={require('../../assets/libertad.png')} alt="Incident" style={{ width: "100%", objectPosition: "center", objectFit: "cover", borderRadius: "10px" }}/> 
      )}
    </div>
  );
};

export default FetchImageFromS3;
