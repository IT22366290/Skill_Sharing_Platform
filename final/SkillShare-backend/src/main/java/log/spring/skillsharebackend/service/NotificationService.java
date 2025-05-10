package log.spring.skillsharebackend.service;


import log.spring.skillsharebackend.dto.impl.NotificationDto;
import log.spring.skillsharebackend.entity.impl.NotificationEntity;

import java.util.List;

public interface NotificationService {
    NotificationEntity createNotification(NotificationDto dto);
    List<NotificationEntity> getNotificationsByUserId(Long userId);
    NotificationEntity markAsRead(Long id);
    void deleteNotification(Long id);
}