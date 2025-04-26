package log.spring.skillsharebackend.dao;

import log.spring.skillsharebackend.entity.impl.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentDao extends JpaRepository<CommentEntity, String> {
    List<CommentEntity> findAllByPostId(Long postId);
}
