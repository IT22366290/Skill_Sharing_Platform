package log.spring.skillsharebackend.controller;

import log.spring.skillsharebackend.dto.impl.LikeDto;
import log.spring.skillsharebackend.entity.impl.LikeEntity;
import log.spring.skillsharebackend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping
    public ResponseEntity<LikeEntity> likePost(@RequestBody LikeDto dto) {
        return ResponseEntity.ok(likeService.likePost(dto));
    }

    @DeleteMapping
    public ResponseEntity<Void> unlikePost(@RequestParam Long postId, @RequestParam Long userId) {
        likeService.unlikePost(postId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<LikeEntity>> getLikesByPost(@PathVariable Long postId) {
        return ResponseEntity.ok(likeService.getLikesByPostId(postId));
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isPostLikedByUser(@RequestParam Long postId, @RequestParam Long userId) {
        return ResponseEntity.ok(likeService.isPostLikedByUser(postId, userId));
    }
    @GetMapping("/count/{postId}")
    public long getLikeCount(@PathVariable Long postId) {
        return likeService.countLikesByPostId(postId);
    }
}
