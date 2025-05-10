package log.spring.skillsharebackend.dao;

import log.spring.skillsharebackend.entity.impl.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventDao extends JpaRepository<EventEntity, Long> {
    List<EventEntity> findByUserId(String userId);
}
