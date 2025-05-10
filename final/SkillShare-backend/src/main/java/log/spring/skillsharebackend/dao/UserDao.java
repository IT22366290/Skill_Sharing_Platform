package log.spring.skillsharebackend.dao;

import log.spring.skillsharebackend.entity.impl.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmailAndPassword(String email, String password);

}
