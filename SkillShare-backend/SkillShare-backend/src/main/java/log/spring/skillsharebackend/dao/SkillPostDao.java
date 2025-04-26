package log.spring.skillsharebackend.dao;

import log.spring.skillsharebackend.entity.impl.SkillPostEntity;
import log.spring.skillsharebackend.entity.impl.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillPostDao extends JpaRepository<SkillPostEntity, String> {


    List<SkillPostEntity> findByUserId(Long userId);
}
