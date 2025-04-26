package log.spring.skillsharebackend.service.impl;

import log.spring.skillsharebackend.dao.LearningPlanDao;
import log.spring.skillsharebackend.dto.impl.LearningPlanDto;
import log.spring.skillsharebackend.entity.impl.LearningPlanEntity;
import log.spring.skillsharebackend.exception.ItemNotFoundException;
import log.spring.skillsharebackend.service.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LearningPlanServiceImpl implements LearningPlanService {

    @Autowired
    private LearningPlanDao learningPlanDao;

    @Override
    public LearningPlanEntity createLearningPlan(LearningPlanDto dto) {
        LearningPlanEntity plan = new LearningPlanEntity(null, dto.getUserId(), dto.getTitle(), dto.getDescription(),
                dto.getFinishPercentage(), dto.getCategoryName(), dto.getStatus(), dto.getTopics(), dto.getStartDate(), dto.getEndDate(),null);
        return learningPlanDao.save(plan);
    }

    @Override
    public List<LearningPlanEntity> getAllPlans() {
        return learningPlanDao.findAll();
    }

    @Override
    public LearningPlanEntity getPlanById(Long id) {
        return learningPlanDao.findById(String.valueOf(id))
                .orElseThrow(() -> new ItemNotFoundException("Learning plan not found with ID: " + id));
    }

    @Override
    public LearningPlanEntity updateLearningPlan(Long id, LearningPlanDto dto) {
        LearningPlanEntity plan = getPlanById(id);
        plan.setTitle(dto.getTitle());
        plan.setDescription(dto.getDescription());
        plan.setFinishPercentage(dto.getFinishPercentage());
        plan.setCategoryName(dto.getCategoryName());
        plan.setStatus(dto.getStatus());
        plan.setTopics(dto.getTopics());
        plan.setStartDate(dto.getStartDate());
        plan.setEndDate(dto.getEndDate());
        return learningPlanDao.save(plan);
    }

    @Override
    public void deleteLearningPlan(Long id) {
        LearningPlanEntity plan = getPlanById(id);
        learningPlanDao.delete(plan);
    }

    @Override
    public List<LearningPlanEntity> getPlansByUserId(Long userId) {
        return learningPlanDao.findAll().stream()
                .filter(plan -> plan.getUserId().equals(userId))
                .collect(Collectors.toList());
    }
}
