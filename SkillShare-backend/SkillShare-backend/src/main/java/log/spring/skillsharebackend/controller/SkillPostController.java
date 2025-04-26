package log.spring.skillsharebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import log.spring.skillsharebackend.dto.impl.SkillPostDto;

import log.spring.skillsharebackend.entity.impl.SkillPostEntity;

import log.spring.skillsharebackend.exception.DataPersistException;
import log.spring.skillsharebackend.service.SkillPostService;
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
@RequestMapping("/api/skillPosts")
public class SkillPostController {

    @Autowired
    private SkillPostService skillPostService;



    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SkillPostEntity> createPost(
            HttpServletRequest request,
            @RequestPart("userId") String userId,
            @RequestPart("description") String description,
            @RequestPart("image") MultipartFile image

    ) {
        System.out.println("Request Content-Type: " + request.getContentType());
        try {

            System.out.println("in to post save method");
            String base64 = ImageConverter.convertImage(image);
            SkillPostDto skillPostDto = new SkillPostDto(Long.parseLong(userId), description, base64);
            SkillPostEntity post = skillPostService.createPost(skillPostDto);
            return new ResponseEntity<>(post, HttpStatus.CREATED);
        } catch (IOException e) {
            throw new RuntimeException("Image conversion failed", e);
        } catch (DataPersistException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<SkillPostEntity>> getAllPosts() {
        return ResponseEntity.ok(skillPostService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillPostEntity> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(skillPostService.getPostById(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SkillPostEntity> updatePost(
            @PathVariable Long id,
            @RequestPart("userId") String userId,
            @RequestPart("description") String description,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        SkillPostDto dto = new SkillPostDto(Long.parseLong(userId), description, null);
        return ResponseEntity.ok(skillPostService.updatePost(id, dto, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        skillPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/user/{userId}")
    public List<SkillPostEntity> getPostsByUserId(@PathVariable String userId) {
        return skillPostService.getPostsByUserId(userId);
    }
}