package com.water.bocai.utils;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.util.*;


/**
 * Created by paul on 2016/5/17.
 */
public class ExcelUtil {

    /**
     * 从excel读取数据到list
     *
     * @param filePath
     * @param fileName
     * @return
     * @throws java.io.IOException
     */
    public static List<String> readExcelDataToList(String filePath, String fileName) throws IOException {
        List<String> list = new ArrayList<String>();
        boolean isE2007 = false;    //判断是否是excel2007格式
        if (fileName.endsWith(Constant.FileType.TYPE_FILE_EXCEL_XLSX))
            isE2007 = true;
        try {
            File file = new File(filePath, fileName);
            InputStream input = new FileInputStream(file);  //建立输入流
            Workbook wb = null;
            //根据文件格式(2003或者2007)来初始化
            if (isE2007)
                wb = new XSSFWorkbook(input);
            else
                wb = new HSSFWorkbook(input);
            Sheet sheet = wb.getSheetAt(0);     //获得第一个表单
            Iterator<Row> rows = sheet.rowIterator(); //获得第一个表单的迭代器
            while (rows.hasNext()) {
                Row row = rows.next();  //获得行数据
                Iterator<Cell> cells = row.cellIterator();    //获得第一行的迭代器
                while (cells.hasNext()) {
                    Cell cell = cells.next();
                    String value = null;
                    switch (cell.getCellType()) {   //根据cell中的类型来输出数据
                        case HSSFCell.CELL_TYPE_NUMERIC:
                            value = String.valueOf(cell.getNumericCellValue());
                            if (StringUtils.isNotBlank(value) && !list.contains(value)) {
                                list.add(value);
                            }
                            break;
                        case HSSFCell.CELL_TYPE_STRING:
                            value = String.valueOf(cell.getStringCellValue());
                            if (StringUtils.isNotBlank(value) && !list.contains(value)) {
                                list.add(value);
                            }
                            break;
                        case HSSFCell.CELL_TYPE_BOOLEAN:
                            value = String.valueOf(cell.getBooleanCellValue());
                            if (StringUtils.isNotBlank(value) && !list.contains(value)) {
                                list.add(value);
                            }
                            break;
                        case HSSFCell.CELL_TYPE_FORMULA:
                            value = String.valueOf(cell.getCellFormula());
                            if (StringUtils.isNotBlank(value) && !list.contains(value)) {
                                list.add(value);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return list;
    }

    public static List<List<String>> readExcelDataToList2(String filePath, String fileName) throws IOException {
        List<List<String>> list = new ArrayList<List<String>>();
        boolean isE2007 = false;    //判断是否是excel2007格式
        if (fileName.endsWith(Constant.FileType.TYPE_FILE_EXCEL_XLSX))
            isE2007 = true;
        try {
            File file = new File(filePath, fileName);
            InputStream input = new FileInputStream(file);  //建立输入流
            Workbook wb = null;
            //根据文件格式(2003或者2007)来初始化
            if (isE2007)
                wb = new XSSFWorkbook(input);
            else
                wb = new HSSFWorkbook(input);
            Sheet sheet = wb.getSheetAt(0);     //获得第一个表单
            Iterator<Row> rows = sheet.rowIterator(); //获得第一个表单的迭代器
            while (rows.hasNext()) {
                Row row = rows.next();  //获得行数据
                Iterator<Cell> cells = row.cellIterator();    //获得第一行的迭代器
                List<String> cellList = new ArrayList<String>();
                while (cells.hasNext()) {
                    Cell cell = cells.next();
                    String value = null;
                    switch (cell.getCellType()) {   //根据cell中的类型来输出数据
                        case HSSFCell.CELL_TYPE_NUMERIC:
                            value = String.valueOf(cell.getNumericCellValue());
                            if (StringUtils.isNotBlank(value) && !list.contains(value)) {
                                cellList.add(value);
                            }
                            break;
                        case HSSFCell.CELL_TYPE_STRING:
                            value = String.valueOf(cell.getStringCellValue());
                            if (StringUtils.isNotBlank(value) && !list.contains(value)) {
                                cellList.add(value);
                            }
                            break;
                        case HSSFCell.CELL_TYPE_BOOLEAN:
                            value = String.valueOf(cell.getBooleanCellValue());
                            if (StringUtils.isNotBlank(value) && !list.contains(value)) {
                                cellList.add(value);
                            }
                            break;
                        case HSSFCell.CELL_TYPE_FORMULA:
                            value = String.valueOf(cell.getCellFormula());
                            if (StringUtils.isNotBlank(value) && !list.contains(value)) {
                                cellList.add(value);
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (cellList != null && cellList.size() == 3) {
                    list.add(cellList);
                }
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return list;
    }

    private Workbook workbook = null;
    private Sheet sheet = null;
    private Row row = null;
    private InputStream inputStream = null;

    public ExcelUtil(File path) {
        try {
            inputStream = new FileInputStream(path);
            workbook = createWorkbook(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
    }

    public ExcelUtil(String path) {
        try {
            inputStream = new FileInputStream(path);
            workbook = createWorkbook(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
    }

    public ExcelUtil(InputStream inputStream) {
        try {
            this.inputStream = inputStream;
            workbook = createWorkbook(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
    }

    /**
     * 读取Excel表格表头的内容
     *
     * @return String 表头内容的数组
     */
    public String[] readExcelTitle(Integer sheetNum) {
        try {
            sheet = workbook.getSheetAt(sheetNum);
            row = sheet.getRow(0);
            if (row != null) {
                int colNum = row.getPhysicalNumberOfCells();// 标题总列数
                String[] title = new String[colNum];
                for (int i = 0; i < colNum; i++) {
                    title[i] = getCellFormatValue(row.getCell(i));
                }
                return title;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 读取Excel所有内容
     *
     * @return
     */
    public Map<String, Object> readExcelContent(String dataKey) {
        Map<String, Object> dataMap = new HashMap<String, Object>();
        Map<String, String[]> map = new HashMap<String, String[]>();//一个关键词对应一个记录
        sheet = workbook.getSheetAt(0);
        int rowNum = sheet.getLastRowNum();// 得到总行数
        row = sheet.getRow(0);
        int colNum = row.getPhysicalNumberOfCells();
        for (int i = 1; i <= rowNum; i++) {
            String[] arrays = new String[colNum];
            row = sheet.getRow(i);
            if (row != null) {
                for (int j = 0; j < colNum; j++) {
                    arrays[j] = getCellFormatValue(row.getCell(j)).trim();
                }

                if (arrays.length != 0) {
                    map.put(arrays[0], arrays);
                }
            }
        }

        dataMap.put(dataKey, map);
        return dataMap;
    }

    /**
     * 读取Excel所有内容
     *
     * @return
     */
    public List<String[]> readExcelContent() {
        List<String[]> list = new ArrayList<>();//一个关键词对应一个记录
        sheet = workbook.getSheetAt(0);
        int rowNum = sheet.getLastRowNum();// 得到总行数
        row = sheet.getRow(0);
        int colNum = row.getPhysicalNumberOfCells();
        for (int i = 0; i <= rowNum; i++) {
            String[] arrays = new String[colNum];
            row = sheet.getRow(i);
            if (row != null) {
                for (int j = 0; j < colNum; j++) {
                    arrays[j] = getCellFormatValue(row.getCell(j)).trim();
                }

                if (arrays.length != 0) {
                    list.add(arrays);
                }
            }
        }

        return list;
    }

    /**
     * 列读取
     *
     * @param headerDtos
     * @param sheetNum
     * @return
     */
//    public Map<String, String> readExcelByCols(List<HeaderDto> headerDtos, Integer sheetNum) {
//        Map<String, String> map = new HashMap<String, String>();
//
//        if (sheetNum == null) {
//            sheetNum = 0;
//        }
//        sheet = workbook.getSheetAt(sheetNum);
//        String[] titles = readExcelTitle(sheetNum);//读取标题；
//        int rowNum = sheet.getLastRowNum();
//        if (titles.length == 0) {
//            throw new IllegalArgumentException("你的excel内容为空");
//        }
//        boolean ok = false;
//        String id = "";
//        for (int i = 0; i < titles.length; ) {
//            List<String> list = new ArrayList<String>();
//            if (!headerDtos.isEmpty()) {
//                for (HeaderDto dto : headerDtos) {
//                    if (titles[i].equals(dto.getName())) {
//                        id = dto.getId();
//                        ok = true;
//                        break;
//                    }
//                }
//                if (ok == false) {
//                    i++;
//                    continue;
//                }
//            }
//            if (ok) {
//                for (int j = 1; j <= rowNum; j++) {
//                    String value = getCellFormatValue(sheet.getRow(j).getCell((short) i)).trim();//第一行标题
//                    if (value == null || value.isEmpty() || ChineseUtill.isMessyCode(value)) {//乱码判断
//                        value = "";
//                    }
//                    list.add(value);
//                }
//                map.put(id, JsonUtil.listToJson(list));
//                ok = false;
//                i++;
//            }
//        }
//        return map;
//    }

    /**
     * 根据Cell类型设置数据
     *
     * @param cell
     * @return
     */
    public String getCellFormatValue(Cell cell) {
        String cellvalue = "";
        if (cell != null) {
            // 判断当前Cell的Type
            switch (cell.getCellType()) {
                // 如果当前Cell的Type为NUMERIC
                case Cell.CELL_TYPE_NUMERIC:
                    cellvalue = String.valueOf(cell.getNumericCellValue());
                    break;
                // 如果当前Cell的Type为STRIN
                case Cell.CELL_TYPE_STRING:
                    // 取得当前的Cell字符串
                    cellvalue = cell.getRichStringCellValue().getString();
                    if (Constant.ConditionHeader.KEYWORD.equals(cellvalue) || Constant.ConditionHeader.KEYWORD_SEARCH.equals(cellvalue)) {
                        cellvalue = "";
                    }
                    break;
                case Cell.CELL_TYPE_BLANK:
                    break;
                case Cell.CELL_TYPE_ERROR:
                    cellvalue = "";
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellvalue = (cell.getBooleanCellValue() == true ? "Y" : "N");
                    break;
                default:// 默认的Cell值
                    cellvalue = " ";
            }
        } else {
            cellvalue = "";
        }
        return cellvalue;
    }

    public Workbook createWorkbook(InputStream in) throws IOException, InvalidFormatException {
        if (!in.markSupported()) {
            in = new PushbackInputStream(in, 8);
        }
        if (POIFSFileSystem.hasPOIFSHeader(in)) {
            return new HSSFWorkbook(in);
        }
        if (POIXMLDocument.hasOOXMLHeader(in)) {
            return new XSSFWorkbook(in);
        }
        throw new IllegalArgumentException("你的excel版本目前poi解析不了");
    }

    public void close() {
        if (inputStream != null) {
            try {
                inputStream.close();
            } catch (IOException e) {
            }
        }
    }

    /**
     * *********************
     * 提供get(),set()方法**start***方便调用对象
     * ******************************
     */

    public Workbook getWorkbook() {
        return workbook;
    }

    public void setWorkbook(Workbook workbook) {
        this.workbook = workbook;
    }

    public Sheet getSheet() {
        return sheet;
    }

    public void setSheet(Sheet sheet) {
        this.sheet = sheet;
    }

    public Row getRow() {
        return row;
    }

    public void setRow(Row row) {
        this.row = row;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }


    /**
     * *********************
     * 提供get(),set()**方法over
     * *******************************************
     */
//    public static void main(String[] args) {
////        ExcelUtil excelReader = new ExcelUtil(new File("D://2a23sdas_2016-03-18.xls"));
////        List<HeaderDto> db = new ArrayList<HeaderDto>();
////        HeaderDto h = new HeaderDto();
////        h.setId("hvuroeivre");
////        h.setName("关键词");
////        db.add(h);
////        HeaderDto hh = new HeaderDto();
////        hh.setId("hvuroeivre1234566785");
////        hh.setName("百度首页推广结果数>=10");
////        db.add(hh);
////        Map<String, String> str = excelReader.readExcelByCols(db, 0);
////        System.out.print(str + " ");
//        String filePath = "E:\\词根导入.xlsx";
//        ExcelUtil excelUtil = new ExcelUtil(new File(filePath));
//        excelUtil.readExcelDataToRootSet();
//    }
//
//    public static Set<List<String>> readExcelDataToRootSet1(String filePath, String fileName) {
//        Set<List<String>> rootSet = new HashSet<>();
//        boolean isE2007 = false;    //判断是否是excel2007格式
//        if (fileName.endsWith(Constant.FileType.TYPE_FILE_EXCEL_XLSX))
//            isE2007 = true;
//        try {
//            File file = new File(filePath, fileName);
//            InputStream input = new FileInputStream(file);  //建立输入流
//            Workbook wb = null;
//            //根据文件格式(2003或者2007)来初始化
//            if (isE2007)
//                wb = new XSSFWorkbook(input);
//            else
//                wb = new HSSFWorkbook(input);
//            Sheet sheet = wb.getSheetAt(0);     //获得第一个表单
//            Iterator<Row> rows = sheet.rowIterator(); //获得第一个表单的迭代器
//            while (rows.hasNext()) {
//                Row row = rows.next();  //获得行数据
//                Iterator<Cell> cells = row.cellIterator();    //获得第一行的迭代器
//                List<String> cellList = new ArrayList<String>();
//                while (cells.hasNext()) {
//                    String value = null;
//                    Cell cell = cells.next();
//                    switch (cell.getCellType()) {   //根据cell中的类型来输出数据
//                        case HSSFCell.CELL_TYPE_NUMERIC:
//                            value = String.valueOf(cell.getNumericCellValue());
//                            if (StringUtils.isNotBlank(value) && !cellList.contains(value)) {
//                                cellList.add(value);
//                            }
//                            break;
//                        case HSSFCell.CELL_TYPE_STRING:
//                            value = String.valueOf(cell.getStringCellValue());
//                            if (StringUtils.isNotBlank(value) && !cellList.contains(value)) {
//                                cellList.add(value);
//                            }
//                            break;
//                        case HSSFCell.CELL_TYPE_BOOLEAN:
//                            value = String.valueOf(cell.getBooleanCellValue());
//                            if (StringUtils.isNotBlank(value) && !cellList.contains(value)) {
//                                cellList.add(value);
//                            }
//                            break;
//                        case HSSFCell.CELL_TYPE_FORMULA:
//                            value = String.valueOf(cell.getCellFormula());
//                            if (StringUtils.isNotBlank(value) && !cellList.contains(value)) {
//                                cellList.add(value);
//                            }
//                            break;
//                        default:
//                            break;
//                    }
//                    if (value == null) {
//                        break;
//                    }
//                }
//                if (!cellList.isEmpty()) rootSet.add(cellList);
//            }
//        } catch (IOException ex) {
//            ex.printStackTrace();
//        }
//        return rootSet;
//    }

    /**
     * 解析词根导入的数据
     */
//    public List<String[]> readExcelDataToRootSet() {
//        long startTime = System.currentTimeMillis();
//        List<String[]> rootList = new ArrayList<>();
//        sheet = workbook.getSheetAt(0);
//        int rowNum = sheet.getLastRowNum();// 得到总行数
//        int allCellNum = 4;
//        int cellNum = 0;
//        for (int i = 0; i <= rowNum; i++) {
//            row = sheet.getRow(i);
//            if (row != null) {
//                String[] arrays = new String[allCellNum];
//                String value = "";
//                boolean flag = true;
//                for (int j = 0; j < allCellNum; j++) {
//                    value = getCellFormatValue(row.getCell(j)).trim();
//                    if (j < 3) { //每一级的词根不能为数字
//                        if (!"".equals(value) && StringUtil.isNumeric(value)) {
//                            flag = false;
//                            break;
//                        }
//                    }
//                    if (value.equals("")) { //剔除格式不正确的数据
//                        if (j == 0) {
//                            flag = false;
//                            break;
//                        } else if (j == 1) {
//                            if (!"".equals(getCellFormatValue(row.getCell(2)).trim())) {
//                                flag = false;
//                                break;
//                            }
//                        } else if (j == 2) {
//                            if ("".equals(getCellFormatValue(row.getCell(3)).trim())) {
//                                arrays[j] = value;
//                                arrays[allCellNum - 1] = "0.0";
//                                cellNum += 2;
//                                break;
//                            }
//                        } else {
//                            if ("".equals(getCellFormatValue(row.getCell(3)).trim())) {
//                                arrays[allCellNum - 1] = "0.0";
//                                cellNum++;
//                                break;
//                            }
//                        }
//                    }
//
//                    arrays[j] = value;
//                    cellNum++;
//                }
//                if (cellNum == allCellNum) { //总的列数一定要为4列
//                    if (StringUtil.isNumeric(arrays[arrays.length - 1])) { //最后一列一定要为数字
//                        if (flag) { //判断数据格式是否合法
//                            if (!rootList.contains(arrays))
//                                rootList.add(arrays);
//                        }
//                    }
//                }
//                cellNum = 0;
//            }
//        }
//        long endTime = System.currentTimeMillis();
//        System.out.println("调用readExcelDataToRootSet()方法一共耗时：" + (endTime - startTime) + "ms");
//        return rootList;
//    }

}
