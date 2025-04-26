package log.spring.skillsharebackend.dao;

import log.spring.skillsharebackend.entity.impl.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationDao extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findAllByUserId(Long userId);
}
