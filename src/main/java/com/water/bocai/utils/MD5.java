package com.water.bocai.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by paul on 2016/2/4.
 */
public final class MD5 {

    public static String getMD5(String string) {
        StringBuffer sb = new StringBuffer();
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(string.getBytes());
            for (byte b : md.digest()) {
                sb.append(Integer.toString(b >>> 4 & 0xF, 16)).append(
                        Integer.toString(b & 0xF, 16));
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return sb.toString();
    }

    public static String getMD5(String s1, String s2) {
        return getMD5(s1 + "_" + s2);
    }

    public static String getMD5(String s1, String s2, String s3) {
        return getMD5(s1 + "_" + s2 + "_" + s3);
    }

    public static String getMD5(String s1, String s2, String s3, String s4) {
        return getMD5(s1 + "_" + s2 + "_" + s3 + "_" + s4);
    }
}