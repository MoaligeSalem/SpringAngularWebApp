package com.javatechie.spring.mongo.api.resource;

import org.springframework.web.multipart.MultipartFile;

public class CSVHelper {
    public static String TYPE = "text/csv";

    public static boolean hasCSVFormat(MultipartFile file) {
        if (TYPE.equals(file.getContentType())
                || file.getContentType().equals("application/vnd.ms-excel")) {
            return true;
        }

        return false;
    }

}
