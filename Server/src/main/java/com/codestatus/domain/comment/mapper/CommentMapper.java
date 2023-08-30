package com.codestatus.domain.comment.mapper;

import com.codestatus.domain.comment.dto.CommentPostDto;
import com.codestatus.domain.comment.dto.CommnetPatchDto;
import com.codestatus.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto requestBody);
    Comment commentPatchDtoToComment(CommnetPatchDto requestBody);

}
