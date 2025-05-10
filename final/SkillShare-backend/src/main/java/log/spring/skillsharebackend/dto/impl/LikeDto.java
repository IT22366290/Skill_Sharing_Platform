package log.spring.skillsharebackend.dto.impl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeDto {
    private Long postId;
    private Long userId;
}
