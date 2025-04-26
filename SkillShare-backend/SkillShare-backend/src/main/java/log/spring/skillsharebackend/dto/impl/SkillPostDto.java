package log.spring.skillsharebackend.dto.impl;


import log.spring.skillsharebackend.dto.status.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillPostDto implements Status {
    private Long userId;
    private String description;
    private String PostPictureBase64;
}
