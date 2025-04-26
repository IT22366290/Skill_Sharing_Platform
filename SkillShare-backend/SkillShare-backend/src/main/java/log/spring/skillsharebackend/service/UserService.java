package log.spring.skillsharebackend.service;

import log.spring.skillsharebackend.dto.impl.SignUpDto;
import log.spring.skillsharebackend.dto.impl.UserDto;

import log.spring.skillsharebackend.entity.impl.UserEntity;

import java.util.List;

public interface UserService {
    void signUp(SignUpDto userDto);
    Long signIn(String email, String password);
    UserEntity createUser(UserDto userDto);
    List<UserEntity> getAllUsers();
    UserEntity getUserById(Long id);
    UserEntity updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
}
