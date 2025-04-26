package log.spring.skillsharebackend.service.impl;

import log.spring.skillsharebackend.dao.NotificationDao;
import log.spring.skillsharebackend.dto.impl.NotificationDto;
import log.spring.skillsharebackend.entity.impl.NotificationEntity;
import log.spring.skillsharebackend.exception.ItemNotFoundException;
import log.spring.skillsharebackend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationDao notificationDao;

    @Override
    public NotificationEntity createNotification(NotificationDto dto) {
        NotificationEntity notification = new NotificationEntity();
        notification.setUserId(dto.getUserId());
        notification.setType(dto.getType());
        notification.setRelatedPostId(dto.getRelatedPostId());
        notification.setMessage(dto.getMessage());
        notification.setRead(false);
        return notificationDao.save(notification);
    }

    @Override
    public List<NotificationEntity> getNotificationsByUserId(Long userId) {
        return notificationDao.findAllByUserId(userId);
    }

    @Override
    public NotificationEntity markAsRead(Long id) {
        NotificationEntity notification = notificationDao.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Notification not found with ID: " + id));
        notification.setRead(true);
        return notificationDao.save(notification);
    }

    @Override
    public void deleteNotification(Long id) {
        notificationDao.deleteById(id);
    }
}
