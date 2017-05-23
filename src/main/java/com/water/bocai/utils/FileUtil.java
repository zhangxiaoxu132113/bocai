package com.water.bocai.utils;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class FileUtil {
    protected static final Log logger = LogFactory.getLog(FileUtil.class);

    public static List<String> readToArr(String fileName) {
        List<String> list = new ArrayList<String>();
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(new File(fileName)), "UTF-8"));
            String s;
            while ((s = in.readLine()) != null) {
                list.add(s);
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }

    /**
     * 追加文件内容
     *
     * @param filePath
     * @param conent
     * @param isWrap
     */
    public static boolean append(String filePath, String conent, boolean isWrap, boolean deleteOrginalFile) {
        boolean isSucess = false;

        FileOutputStream out = null;
        OutputStreamWriter osw = null;
        BufferedWriter bw = null;
        try {
            File file = createFile(filePath, null, deleteOrginalFile);
            out = new FileOutputStream(file, true);
            osw = new OutputStreamWriter(out, "UTF-8");
            bw = new BufferedWriter(osw);
            bw.append(conent);
            if (isWrap) {
                bw.append("\r");
            }
            isSucess = true;
        } catch (Exception e) {
            isSucess = false;
        } finally {
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (osw != null) {
                try {
                    osw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return isSucess;
    }

    /**
     * 追加文件内容
     *
     * @param filePath
     * @param dataList
     * @param isWrap
     */
    public static boolean append(String filePath, List<String> dataList, boolean isWrap, boolean deleteOrginalFile) {
        boolean isSucess = false;

        FileOutputStream out = null;
        OutputStreamWriter osw = null;
        BufferedWriter bw = null;
        try {
            File file = createFile(filePath, null, deleteOrginalFile);
            out = new FileOutputStream(file, true);
            osw = new OutputStreamWriter(out);
            bw = new BufferedWriter(osw);
            if (dataList != null && !dataList.isEmpty()) {
                for (String data : dataList) {
                    bw.append(data);
                    if (isWrap) {
                        bw.append("\r");
                    }
                }
            }
            bw.flush();
            isSucess = true;
        } catch (Exception e) {
            isSucess = false;
        } finally {
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (osw != null) {
                try {
                    osw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return isSucess;
    }

    /**
     * 根据上传的MultipartFile写入到指定的目录
     *
     * @param multipartFile 文件对象
     * @param filePath      上传路径
     * @param fileName      文件名
     * @return 文件名
     */
    public static String fileUpload(MultipartFile multipartFile, String filePath, String fileName) {
        try {
            File file = createFile(filePath, fileName, true);
            FileUtils.copyInputStreamToFile(multipartFile.getInputStream(), file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileName;
    }

    public static File createFile(String filePath, String fileName, boolean deleteOrginalFile) throws IOException {
        File file = null;
        if (StringUtils.isNotBlank(fileName)) {
            file = new File(filePath, fileName);
        } else {
            file = new File(filePath);
        }
        if (file.exists()) {
            if (deleteOrginalFile) {
                file.delete();
            }
        } else {
            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }
            file.createNewFile();
        }
        return file;
    }

}
