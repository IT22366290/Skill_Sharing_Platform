package log.spring.skillsharebackend.controller;

import log.spring.skillsharebackend.dto.impl.NotificationDto;
import log.spring.skillsharebackend.entity.impl.NotificationEntity;
import log.spring.skillsharebackend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationEntity> create(@RequestBody NotificationDto dto) {
        return ResponseEntity.ok(notificationService.createNotification(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationEntity>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getNotificationsByUserId(userId));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<NotificationEntity> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}