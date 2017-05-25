package com.water.bocai.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.text.DecimalFormat;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 用于导出Excel的工具类
 * Created by paul on 2016/2/25.
 */
public class ExportUtils {
    protected static final Log logger = LogFactory.getLog(ExportUtils.class);

    /**
     * 通用导出动态列和动态数据到excel
     * dataMap
     * 需包含key:
     * destFilePath 导出目录
     * sheetName sheet名
     * dColumns 动态列
     * dColumnData 动态数据
     *
     * @param dataMap
     * @return
     */
    public static boolean exportDiynamicDataToLocalExcel(Map<String, Object> dataMap) {
        String destFilePath = (String) dataMap.get("destFilePath");
        String sheetName = (String) dataMap.get("sheetName");
        List<EasyUIColumn> dColumns = (List<EasyUIColumn>) dataMap.get("dColumns");
        JSONArray dColumnData = (JSONArray) dataMap.get("dColumnData");

        OutputStream out = null;
        try {
            File f = new File(destFilePath);
            if (!f.exists()) {
                if (!f.getParentFile().exists()) {
                    f.getParentFile().mkdirs();
                }
                f.createNewFile();
            }
            out = new BufferedOutputStream(new FileOutputStream(f));
            SXSSFWorkbook wb = new SXSSFWorkbook(1000);

            org.apache.poi.ss.usermodel.Sheet sheet = wb.createSheet(sheetName);
            sheet.setDefaultColumnWidth(23);

            Cell cell = null;

            //默认样式：12号宋体，居中
            CellStyle cellDefStyle = ExcelStyle.getAlignCenterStyle(wb);
            cellDefStyle.setFont(ExcelStyle.getDefaultFont(wb));
            //样式：字体加粗，居中
            CellStyle cellDefBoldFontStyle = ExcelStyle.getAlignCenterStyle(wb);
            cellDefBoldFontStyle.setFont(ExcelStyle.getDefBoldFont(wb));

            int sheetColumn = 0;
            Row row = sheet.createRow(sheetColumn++);
            int ccolumn = 0;
            for (EasyUIColumn dColumn : dColumns) {
                cell = row.createCell(ccolumn++);
                cell.setCellValue(dColumn.getTitle());
                cell.setCellStyle(cellDefBoldFontStyle);
            }

            for (int i = 0; i < dColumnData.size(); i++) {
                int dcolumn = 0;
                row = sheet.createRow(sheetColumn++);
                for (EasyUIColumn dColumn : dColumns) {
                    cell = row.createCell(dcolumn++);
                    Object o = dColumnData.getJSONObject(i).get(dColumn.getField());
                    cell.setCellValue(o == null ? "" : o.toString());
                    cell.setCellStyle(cellDefStyle);
                }
            }

            wb.write(out);
            out.flush();
            logger.info("Export success! The xlsx file save at " + destFilePath);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error cause! " + e.getMessage());
            return Boolean.FALSE;
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return Boolean.TRUE;
    }

    /**
     * 实现将多个文件进行压缩，生成指定目录下的指定名字的压缩文件
     * Parameters:
     * filename ：指定生成的压缩文件的名称
     * temp_path ：指定生成的压缩文件所存放的目录
     * list ：List集合：用于存放多个File（文件）
     */
    public static boolean createZip(String filename, String temp_path,
                                    List<File> list) {
        File file = new File(temp_path);
        System.err.println(temp_path);
        File zipFile = new File(temp_path + File.separator + filename);
        InputStream input = null;
        try {
            ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFile));
            zipOut.setComment(file.getName());
            if (file.isDirectory()) {
                for (int i = 0; i < list.size(); ++i) {
                    input = new FileInputStream(list.get(i));
                    zipOut.putNextEntry(new ZipEntry(file.getName() + File.separator + list.get(i).getName()));
                    int temp = 0;
                    while ((temp = input.read()) != -1) {
                        zipOut.write(temp);
                    }
                    input.close();
                }
            }
            zipOut.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
