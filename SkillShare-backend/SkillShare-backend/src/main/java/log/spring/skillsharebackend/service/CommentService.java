package log.spring.skillsharebackend.service;

import log.spring.skillsharebackend.dto.impl.CommentDto;
import log.spring.skillsharebackend.entity.impl.CommentEntity;

import java.util.List;

public interface CommentService {
    CommentEntity addComment(CommentDto dto);
    List<CommentEntity> getCommentsByPostId(Long postId);
    void deleteComment(Long id);
}