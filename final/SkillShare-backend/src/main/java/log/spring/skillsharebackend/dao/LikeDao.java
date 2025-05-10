package log.spring.skillsharebackend.dao;

import log.spring.skillsharebackend.entity.impl.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeDao extends JpaRepository<LikeEntity, String> {
    LikeEntity findByPostIdAndUserId(Long postId, Long userId);

    List<LikeEntity> findAllByPostId(Long postId);

    long countByPostId(Long postId);
}
