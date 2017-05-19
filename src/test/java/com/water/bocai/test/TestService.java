package com.water.bocai.test;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by mrwater on 2017/5/7.
 */
public class TestService {

    public static void main(String[] args) {
        int packageNum = 5;
        Map<String, Integer> resultMap = new HashMap<>();
        resultMap.put("red1", 6);
        resultMap.put("red2", 1);
        resultMap.put("red3", 9);
        resultMap.put("red4", 2);
        resultMap.put("red5", 10);
        resultMap.put("red6", 1);
        Map<String, Integer[]> dataMap = getPackageNumsResult(packageNum, resultMap);
        for (Map.Entry<String, Integer[]> entry : dataMap.entrySet()) {
            System.out.println(entry.getKey());
            Integer[] tmpArr = entry.getValue();
            for (Integer val : tmpArr) {
                System.out.println(val);
            }
        }
        System.out.println();
    }

    private static Map<String, Integer[]> getPackageNumsResult(Integer packageNum, Map<String, Integer> resultMap) {
        Map<String, Integer[]> dataMap = new HashMap<>();
        Integer value = resultMap.get(String.format("red%s", packageNum));
        Integer packageNumName;
        Integer[] inPackageNums = new Integer[0];
        Integer[] outPackageNums = new Integer[0];
        Integer[] tiePackageNums = new Integer[0];
        for (Map.Entry<String, Integer> entry : resultMap.entrySet()) {
            packageNumName = Integer.valueOf(entry.getKey().substring(entry.getKey().length() - 1, entry.getKey().length()));
            if (value > entry.getValue()) {
                inPackageNums = add(inPackageNums, packageNumName);
            } else if (value < entry.getValue()) {
                outPackageNums = add(outPackageNums, packageNumName);
            } else {
                if (value <= 5) {
                    inPackageNums = add(inPackageNums, packageNumName);
                } else {
                    tiePackageNums = add(tiePackageNums, packageNumName);
                }
            }
        }

        dataMap.put("inPackageNums", inPackageNums);
        dataMap.put("outPackageNums", outPackageNums);
        dataMap.put("tiePackageNums", tiePackageNums);
        return dataMap;
    }

    private static Integer[] add(Integer[] oldArr, Integer value) {
        Integer[] newArr = new Integer[oldArr.length + 1];
        for (int i = 0; i < oldArr.length; i++) {
            newArr[i] = oldArr[i];
        }
        newArr[newArr.length-1] = value;
        return newArr;
    }
}
