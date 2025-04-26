package log.spring.skillsharebackend.entity.impl;

import jakarta.persistence.*;
import log.spring.skillsharebackend.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity implements SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    @Column(columnDefinition = "LONGTEXT")
    private String profilePictureBase64;
    private String password;

    @ElementCollection
    @CollectionTable(name = "user_followings", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "following_user_id")
    private List<Long> followingUserIds;

}
