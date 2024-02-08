package com.ssafy.forest.domain.dto.response;

import com.ssafy.forest.domain.entity.Member;
import com.ssafy.forest.domain.type.MemberType;
import com.ssafy.forest.domain.type.SocialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberResDto {

    private Long id;
    private String email;
    private MemberType memberType;
    private SocialType socialType;
    private int articleCreationCount;

    public static MemberResDto from(Member member) {
        return MemberResDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .memberType(member.getMemberType())
                .socialType(member.getSocialType())
                .articleCreationCount(member.getArticleCreationLimit())
                .build();
    }

}