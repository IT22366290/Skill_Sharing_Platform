package log.spring.skillsharebackend.entity.impl;

import jakarta.persistence.*;
import log.spring.skillsharebackend.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notifications")
public class NotificationEntity implements SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String type;
    private Long relatedPostId;
    private String message;
    private boolean isRead;
    private LocalTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalTime.now();
    }
}
