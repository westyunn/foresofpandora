package com.ssafy.forest.util;

import java.util.Random;
import lombok.experimental.UtilityClass;

@UtilityClass
public class BackgroundImageUtil {

    private final int BACKGROUND_IMAGE_LENGTH = 9;

    public static String pickNumber() {
        long seed = System.currentTimeMillis();
        Random random = new Random(seed);
        return Integer.toString(random.nextInt(BACKGROUND_IMAGE_LENGTH) + 1);
    }

}
