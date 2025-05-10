package log.spring.skillsharebackend.service;

import log.spring.skillsharebackend.dto.impl.SkillPostDto;

import log.spring.skillsharebackend.entity.impl.SkillPostEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SkillPostService {
    SkillPostEntity createPost(SkillPostDto dto) throws IOException;
    List<SkillPostEntity> getAllPosts();
    SkillPostEntity getPostById(Long id);
    SkillPostEntity updatePost(Long id, SkillPostDto dto, MultipartFile image) throws IOException;
    void deletePost(Long id);

    List<SkillPostEntity> getPostsByUserId(String userId);

}