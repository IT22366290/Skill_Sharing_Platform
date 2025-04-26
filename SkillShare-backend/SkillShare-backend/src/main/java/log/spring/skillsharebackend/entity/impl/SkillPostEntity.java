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
@Table(name = "skill_posts")
public class SkillPostEntity implements SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String description;

    @Column(columnDefinition = "LONGTEXT")
    private String postPictureBase64;

    private LocalTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalTime.now();
    }
}
