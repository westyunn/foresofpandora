package com.ssafy.forest.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forest.exception.ErrorCode;
import java.io.IOException;
import java.net.URL;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String saveFile(MultipartFile multipartFile) {
        String uuidFilename = "images/" + UUID.randomUUID();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        try {
            amazonS3.putObject(bucket, uuidFilename, multipartFile.getInputStream(), metadata);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.IMAGE_UPLOAD_FAIL);
        }

        return amazonS3.getUrl(bucket, uuidFilename).toString();
    }

    public String getFileUrl(String s3FileName){
        return amazonS3.getUrl(bucket,s3FileName).toString();
    }

    public void deleteImage(String imageURL) {
        try {
            URL url = new URL(imageURL);
            String key = url.getPath().substring(1);

            amazonS3.deleteObject(bucket, key);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.IMAGE_DELETE_FAIL);
        }
    }

}
