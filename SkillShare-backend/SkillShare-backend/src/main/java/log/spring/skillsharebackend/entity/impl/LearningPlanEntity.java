package log.spring.skillsharebackend.entity.impl;

import jakarta.persistence.*;
import log.spring.skillsharebackend.entity.EmbeddableClass.LearningTopic;
import log.spring.skillsharebackend.entity.SuperEntity;
import log.spring.skillsharebackend.entity.enumClass.LearningPlanStatus;
import log.spring.skillsharebackend.entity.enumClass.LearningPlansCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "learning_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningPlanEntity implements SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String title;
    private String description;
    private int finishPercentage;

    @Enumerated(EnumType.STRING)
    private LearningPlansCategory categoryName;

    @Enumerated(EnumType.STRING)
    private LearningPlanStatus status;

    @ElementCollection
    @CollectionTable(name = "learning_plan_topics", joinColumns = @JoinColumn(name = "learning_plan_id"))
    private List<LearningTopic> topics;

    private Date startDate;
    private Date endDate;
    private LocalTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalTime.now();
    }
}