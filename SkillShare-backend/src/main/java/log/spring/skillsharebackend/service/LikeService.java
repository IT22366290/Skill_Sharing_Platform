package log.spring.skillsharebackend.service;

import log.spring.skillsharebackend.dto.impl.LikeDto;
import log.spring.skillsharebackend.entity.impl.LikeEntity;

import java.util.List;

public interface LikeService {
    LikeEntity likePost(LikeDto dto);
    void unlikePost(Long postId, Long userId);
    List<LikeEntity> getLikesByPostId(Long postId);
    boolean isPostLikedByUser(Long postId, Long userId);
    long countLikesByPostId(Long postId);

}