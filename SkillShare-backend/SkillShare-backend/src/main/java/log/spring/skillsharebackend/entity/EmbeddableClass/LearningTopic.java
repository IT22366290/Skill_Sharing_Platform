package log.spring.skillsharebackend.entity.EmbeddableClass;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import log.spring.skillsharebackend.entity.enumClass.LearningTopicStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Embeddable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningTopic {
    private String topic;
    @Enumerated(EnumType.STRING)
    private LearningTopicStatus status;
}
