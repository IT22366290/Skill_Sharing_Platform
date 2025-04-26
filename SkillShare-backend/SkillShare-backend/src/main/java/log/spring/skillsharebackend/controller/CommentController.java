package log.spring.skillsharebackend.controller;

import log.spring.skillsharebackend.dto.impl.CommentDto;
import log.spring.skillsharebackend.entity.impl.CommentEntity;
import log.spring.skillsharebackend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentEntity> addComment(@RequestBody CommentDto dto) {
        return ResponseEntity.ok(commentService.addComment(dto));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentEntity>> getCommentsByPost(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
