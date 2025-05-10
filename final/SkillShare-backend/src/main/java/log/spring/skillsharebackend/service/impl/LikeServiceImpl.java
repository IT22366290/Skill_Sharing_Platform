package log.spring.skillsharebackend.service.impl;

import log.spring.skillsharebackend.dao.LikeDao;
import log.spring.skillsharebackend.dto.impl.LikeDto;
import log.spring.skillsharebackend.entity.impl.LikeEntity;
import log.spring.skillsharebackend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeDao likeDao;

    @Override
    public LikeEntity likePost(LikeDto dto) {
        LikeEntity like = new LikeEntity();
        like.setPostId(dto.getPostId());
        like.setUserId(dto.getUserId());
        like.setLikedAt(System.currentTimeMillis());
        return likeDao.save(like);
    }

    @Override
    public void unlikePost(Long postId, Long userId) {
        LikeEntity like = likeDao.findByPostIdAndUserId(postId, userId);
        if (like != null) {
            likeDao.delete(like);
        }
    }

    @Override
    public List<LikeEntity> getLikesByPostId(Long postId) {
        return likeDao.findAllByPostId(postId);
    }

    @Override
    public boolean isPostLikedByUser(Long postId, Long userId) {
        return likeDao.findByPostIdAndUserId(postId, userId) != null;
    }
    @Override
    public long countLikesByPostId(Long postId) {
        return likeDao.countByPostId(postId);
    }
}