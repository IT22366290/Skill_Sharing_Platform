package log.spring.skillsharebackend.service.impl;


import jakarta.transaction.Transactional;
import log.spring.skillsharebackend.dao.SkillPostDao;
import log.spring.skillsharebackend.dto.impl.SkillPostDto;
import log.spring.skillsharebackend.entity.impl.SkillPostEntity;
import log.spring.skillsharebackend.exception.ItemNotFoundException;
import log.spring.skillsharebackend.service.SkillPostService;
import log.spring.skillsharebackend.ImageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class SkillPostServiceImpl implements SkillPostService {

    @Autowired
    private SkillPostDao skillPostDao;

    @Override
    public SkillPostEntity createPost(SkillPostDto dto) throws IOException {
        SkillPostEntity post = new SkillPostEntity(null, dto.getUserId(), dto.getDescription(), dto.getPostPictureBase64(), null);
        return skillPostDao.save(post);
    }

    @Override
    public List<SkillPostEntity> getAllPosts() {
        return skillPostDao.findAll();
    }

    @Override
    public SkillPostEntity getPostById(Long id) {
        return skillPostDao.findById(String.valueOf(id))
                .orElseThrow(() -> new ItemNotFoundException("Skill post not found with ID: " + id));
    }

    @Override
    public SkillPostEntity updatePost(Long id, SkillPostDto dto, MultipartFile image) throws IOException {
        SkillPostEntity post = getPostById(id);
        post.setDescription(dto.getDescription());
        post.setUserId(dto.getUserId());
        if (image != null && !image.isEmpty()) {
            post.setPostPictureBase64(ImageConverter.convertImage(image));
        }
        return skillPostDao.save(post);
    }

    @Override
    public void deletePost(Long id) {
        SkillPostEntity post = getPostById(id);
        skillPostDao.delete(post);
    }
    @Override
    public List<SkillPostEntity> getPostsByUserId(String userId) {
        return skillPostDao.findByUserId(Long.valueOf(userId));
    }

}