package log.spring.skillsharebackend.service;

import log.spring.skillsharebackend.dto.impl.LearningPlanDto;
import log.spring.skillsharebackend.entity.impl.LearningPlanEntity;

import java.util.List;

public interface LearningPlanService {
    LearningPlanEntity createLearningPlan(LearningPlanDto dto);
    List<LearningPlanEntity> getAllPlans();
    LearningPlanEntity getPlanById(Long id);
    LearningPlanEntity updateLearningPlan(Long id, LearningPlanDto dto);
    void deleteLearningPlan(Long id);
    List<LearningPlanEntity> getPlansByUserId(Long userId);

}
