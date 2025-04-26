package log.spring.skillsharebackend.dao;

import log.spring.skillsharebackend.entity.impl.LearningPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningPlanDao extends JpaRepository<LearningPlanEntity, String> {
}
