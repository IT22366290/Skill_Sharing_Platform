package log.spring.skillsharebackend.service.impl;

import jakarta.transaction.Transactional;
import log.spring.skillsharebackend.dao.UserDao;
import log.spring.skillsharebackend.dto.impl.SignUpDto;
import log.spring.skillsharebackend.dto.impl.UserDto;
import log.spring.skillsharebackend.entity.impl.UserEntity;
import log.spring.skillsharebackend.exception.DataPersistException;
import log.spring.skillsharebackend.exception.ItemNotFoundException;

import log.spring.skillsharebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;



    @Override
    public void signUp(SignUpDto userDto) {
        userDto.setPassword(hashPassword(userDto.getPassword()));
        if (userDao.save(new UserEntity(null, userDto.getUserName(), userDto.getEmail(), null, userDto.getPassword(), null)) == null) {
            throw new DataPersistException();
        }
    }

    @Override
    public Long signIn(String email, String password) {
        String hashed = hashPassword(password);
        Optional<UserEntity> user = userDao.findByEmailAndPassword(email, hashed);
        System.out.println("pass data");
        return user.map(UserEntity::getId).orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }

    private String hashPassword(String password) {
        try {
            byte[] salt = "12345678".getBytes(); // Use a proper random salt generator in real apps
            PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 256);
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            byte[] hash = skf.generateSecret(spec).getEncoded();
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException("Error while hashing password", e);
        }
    }

    @Override
    public UserEntity createUser(UserDto userDto) {
        UserEntity user = new UserEntity();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(hashPassword(userDto.getPassword()));
        user.setProfilePictureBase64(userDto.getProfilePictureBase64());
        return userDao.save(user);
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public UserEntity getUserById(Long id) {
        return userDao.findById(String.valueOf(id))
                .orElseThrow(() -> new ItemNotFoundException("User not found with ID: " + id));
    }

    @Override
    public UserEntity updateUser(Long id, UserDto userDto) {
        UserEntity user = getUserById(id);
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(hashPassword(userDto.getPassword()));
        user.setProfilePictureBase64(userDto.getProfilePictureBase64());
        return userDao.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        UserEntity user = getUserById(id);
        userDao.delete(user);
    }
    @Override
    public void followUser(Long userId, Long followId) {
        UserEntity user = getUserById(userId);
        if (user.getFollowingUserIds() == null) {
            user.setFollowingUserIds(new ArrayList<>());
        }
        if (!user.getFollowingUserIds().contains(followId)) {
            user.getFollowingUserIds().add(followId);
            userDao.save(user);
        }
    }

    @Override
    public void unfollowUser(Long userId, Long unfollowId) {
        UserEntity user = getUserById(userId);
        if (user.getFollowingUserIds() != null && user.getFollowingUserIds().contains(unfollowId)) {
            user.getFollowingUserIds().remove(unfollowId);
            userDao.save(user);
        }
    }

    @Override
    public List<UserEntity> getFollowings(Long userId) {
        UserEntity user = getUserById(userId);
        return user.getFollowingUserIds().stream()
                .map(this::getUserById)
                .collect(Collectors.toList());
    }



    @Override
    public void updateUserProfile(Long id, String userName, String email, String profilePictureBase64) {
        UserEntity user = getUserById(id);
        user.setUsername(userName);
        user.setEmail(email);
        user.setProfilePictureBase64(profilePictureBase64);
        userDao.save(user);
    }

    @Override
    public boolean updateUserPasswordIfMatch(Long id, String oldPassword, String newPassword) {
        UserEntity user = getUserById(id);
        String hashedOldPassword = hashPassword(oldPassword);
        System.out.println(hashedOldPassword+"adasdasdada old password");

        if (!user.getPassword().equals(hashedOldPassword)) {
            return false; // Old password doesn't match
        }

        user.setPassword(hashPassword(newPassword));
        userDao.save(user);
        return true;
    }



}