package log.spring.skillsharebackend.controller;

import log.spring.skillsharebackend.dto.impl.CommentDto;
import log.spring.skillsharebackend.dto.impl.SignInDto;
import log.spring.skillsharebackend.dto.impl.SignUpDto;
import log.spring.skillsharebackend.dto.impl.UserDto;

import log.spring.skillsharebackend.entity.impl.UserEntity;
import log.spring.skillsharebackend.exception.DataPersistException;
import log.spring.skillsharebackend.service.UserService;
import log.spring.skillsharebackend.util.ImageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserEntity> createUser(
            @RequestPart("userName") String userName,
            @RequestPart("email") String email,
            @RequestPart("password") String password,
            @RequestPart("profilePic") MultipartFile profilePic) {
        try {
            System.out.println("in to post save method");
            String base64 = ImageConverter.convertImage(profilePic);
            UserDto dto = new UserDto(userName, email, base64, password);
            UserEntity createdUser = userService.createUser(dto);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (IOException e) {
            throw new RuntimeException("Image conversion failed", e);
        } catch (DataPersistException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }





    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> signUp(
            @RequestBody SignUpDto dto) {

        userService.signUp(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User signed up successfully");
    }

    @PostMapping(value = "/signin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> signIn(@RequestBody SignInDto signIn) {
        System.out.println("Processing sign-in request...");
        try {
            String userId = String.valueOf(userService.signIn(signIn.getEmail(), signIn.getPassword()));
            return ResponseEntity.ok(userId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserEntity> updateUser(
            @PathVariable Long id,
            @RequestPart("userName") String userName,
            @RequestPart("email") String email,
            @RequestPart("password") String password,
            @RequestPart(value = "profilePic", required = false) MultipartFile profilePic) {
        try {
            String base64 = (profilePic != null && !profilePic.isEmpty())
                    ? ImageConverter.convertImage(profilePic)
                    : userService.getUserById(id).getProfilePictureBase64();
            UserDto dto = new UserDto(userName, email, base64, password);
            return ResponseEntity.ok(userService.updateUser(id, dto));
        } catch (IOException e) {
            throw new RuntimeException("Image conversion failed", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}