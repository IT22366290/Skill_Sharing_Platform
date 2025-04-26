package log.spring.skillsharebackend.dto.impl;

import log.spring.skillsharebackend.dto.status.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import log.spring.skillsharebackend.entity.EmbeddableClass.LearningTopic;
import log.spring.skillsharebackend.entity.enumClass.LearningPlanStatus;
import log.spring.skillsharebackend.entity.enumClass.LearningPlansCategory;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningPlanDto implements Status {
    private Long userId;
    private String title;
    private String description;
    private int finishPercentage;
    private LearningPlansCategory categoryName;
    private LearningPlanStatus status;
    private List<LearningTopic> topics;
    private String timeline;
    private Date startDate;
    private Date endDate;
}
