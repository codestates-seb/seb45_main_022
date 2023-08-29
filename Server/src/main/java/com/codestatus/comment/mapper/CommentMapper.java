package com.codestatus.comment.mapper;

import com.codestatus.comment.dto.CommentPostDto;
import com.codestatus.comment.dto.CommnetPatchDto;
import com.codestatus.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto requestBody);
    Comment commentPatchDtoToComment(CommnetPatchDto requestBody);

}
