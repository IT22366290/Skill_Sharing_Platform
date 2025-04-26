package log.spring.skillsharebackend.controller;

import log.spring.skillsharebackend.dto.impl.LearningPlanDto;
import log.spring.skillsharebackend.entity.impl.LearningPlanEntity;
import log.spring.skillsharebackend.service.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learningPlans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService learningPlanService;

    @PostMapping
    public ResponseEntity<LearningPlanEntity> createPlan(@RequestBody LearningPlanDto dto) {
        return ResponseEntity.ok(learningPlanService.createLearningPlan(dto));
    }

    @GetMapping
    public ResponseEntity<List<LearningPlanEntity>> getAllPlans() {
        return ResponseEntity.ok(learningPlanService.getAllPlans());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningPlanEntity>> getPlansByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(learningPlanService.getPlansByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPlanEntity> getPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(learningPlanService.getPlanById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPlanEntity> updatePlan(@PathVariable Long id, @RequestBody LearningPlanDto dto) {
        return ResponseEntity.ok(learningPlanService.updateLearningPlan(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        learningPlanService.deleteLearningPlan(id);
        return ResponseEntity.noContent().build();
    }
}
