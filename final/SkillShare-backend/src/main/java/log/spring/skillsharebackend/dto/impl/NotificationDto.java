package log.spring.skillsharebackend.dto.impl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private Long userId;
    private String type;
    private Long relatedPostId;
    private String message;
}