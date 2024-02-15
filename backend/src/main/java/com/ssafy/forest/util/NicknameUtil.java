package com.ssafy.forest.util;

import java.util.HashMap;
import java.util.Map;
import lombok.experimental.UtilityClass;

@UtilityClass
public class NicknameUtil {

    StringBuilder sb;
    public final String WITHDRAWAL_MEMBER = "(탈퇴한 회원)";
    private final int PROFILE_IMAGE_LENGTH = 15;
    private final int BACKGROUND_COLOR_LENGTH = 2;

    public String[] nicknames = {
        "화려한 호랑이", "신비로운 펭귄", "빠른 사슴", "부드러운 곰", "활기찬 햄스터", "우아한 기린", "차분한 강아지", "물렁한 고양이", "단단한 거북이", "작은 토끼",
        "빠른 코끼리", "촉촉한 코알라", "날렵한 강아지", "밝은 오리", "귀여운 판다", "우아한 말", "해맑은 앵무새", "해맑은 기러기", "근엄한 상어", "둔한 늑대",
        "근엄한 미어캣", "거대한 코뿔소", "근엄한 푸들", "유연한 뱀", "매혹적인 카멜레온", "환상적인 플라밍고", "근엄한 기러기", "무딘 비버", "단단한 불가사리", "발랄한 토끼",
        "우아한 악어", "건장한 알파카", "밝은 앵무새", "눈부신 황소", "흥겨운 하이에나", "사랑스러운 오소리", "촉촉한 오리", "우아한 얼룩말", "근엄한 너구리", "날렵한 나무늘보",
        "건장한 독수리", "유쾌한 오징어", "천진난만한 캥거루", "화려한 플라밍고", "우아한 밍크", "강인한 코뿔소", "푹신한 푸들", "화려한 고양이", "신비로운 히포포타무스", "활기찬 학",
        "날렵한 코요테", "촉촉한 카멜레온", "화려한 황소", "무뚝뚝한 사슴", "신중한 오리", "빠른 밍크", "활기찬 사슴벌레", "유쾌한 알파카", "화려한 피그미", "뚜렷한 돌고래",
        "우아한 아르마딜로", "활발한 개미", "놀라운 오소리", "활기찬 지렁이", "우아한 코뿔소", "단단한 토끼", "미끄러운 미어캣", "길쭉한 고릴라", "화려한 햇살 고양이", "해맑은 기린",
        "우아한 플라밍고", "유연한 말랭이", "촉촉한 펭귄", "달콤한 판다", "날렵한 뱀", "매력적인 코알라", "빠른 푸들", "부드러운 개구리", "차분한 토끼", "빠른 햄스터",
        "길쭉한 개미핥기", "신비로운 도마뱀", "꼬물거리는 거북이", "밝은 고슴도치", "화려한 말", "유연한 말", "바쁜 꿀벌", "달콤한 들개", "춤추는 물개", "활기찬 여우",
        "유쾌한 앵무새", "단단한 철갑상어", "작은 불곰", "신비로운 박쥐", "고요한 사슴", "활기찬 얼룩말", "빠른 바다거북", "날렵한 지렁이", "물렁한 개미핥기", "소심한 물총새",
        "뚜렷한 돌고래", "우아한 햄스터", "활발한 불개미", "놀라운 오소리", "활기찬 무당벌레", "우아한 지렁이", "단단한 사슴벌레", "미끄러운 미어캣", "길쭉한 고릴라", "화려한 사자",
        "귀여운 기린", "날렵한 플라밍고", "근엄한 말랭이", "통통한 펭귄", "달콤한 판다", "날렵한 뱀", "매력적인 코알라", "작은 푸들", "촉감있는 개구리", "차분한 토끼",
        "빠른 햄스터", "길쭉한 개미핥기", "신비로운 도마뱀", "꼬물거리는 거북이", "밝은 고슴도치", "화려한 개미", "근엄한 말", "바쁜 꿀벌", "달콤한 들개", "춤추는 물개",
        "활기찬 여우", "유쾌한 앵무새", "날렵한 철갑상어", "영리한 불곰", "영리한 박쥐", "고요한 사슴", "활기찬 얼룩말", "작은 바다거북", "잘생긴 나무늘보", "물렁한 강아지"
    };  // 140 개

    public Map<String, Object> hash(long num) {
        Map<String, Object> map = new HashMap<>();

        long hash = 5381;  // 임의의 수
        hash = (hash << 1) + num * hash;
        if (hash < 0) hash *= -1;
        String val = String.valueOf(hash);
        sb = new StringBuilder();
        sb.append(nicknames[(int) hash % nicknames.length]).append("(#").append(val.substring(val.length()-4)).append(")");
        map.put("nickname",sb.toString());
        map.put("profileIdx", (int) hash % PROFILE_IMAGE_LENGTH);
        map.put("backgroundIdx", (int) hash % BACKGROUND_COLOR_LENGTH);

        return map;
    }

}
