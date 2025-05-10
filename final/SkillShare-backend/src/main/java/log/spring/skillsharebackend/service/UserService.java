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
    void followUser(Long userId, Long followId);
    void unfollowUser(Long userId, Long unfollowId);
    List<UserEntity> getFollowings(Long userId);





    void updateUserProfile(Long id, String userName, String email, String profilePictureBase64);

    boolean updateUserPasswordIfMatch(Long id, String oldPassword, String newPassword);


}
