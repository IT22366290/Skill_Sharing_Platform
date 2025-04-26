package log.spring.skillsharebackend.service.impl;

import log.spring.skillsharebackend.dao.CommentDao;
import log.spring.skillsharebackend.dto.impl.CommentDto;
import log.spring.skillsharebackend.entity.impl.CommentEntity;
import log.spring.skillsharebackend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentDao commentDao;

    @Override
    public CommentEntity addComment(CommentDto dto) {
        CommentEntity comment = new CommentEntity();
        comment.setPostId(dto.getPostId());
        comment.setUserId(dto.getUserId());
        comment.setText(dto.getText());
        return commentDao.save(comment);
    }

    @Override
    public List<CommentEntity> getCommentsByPostId(Long postId) {
        return commentDao.findAllByPostId(postId);
    }

    @Override
    public void deleteComment(Long id) {
        commentDao.deleteById(String.valueOf(id));
    }
}