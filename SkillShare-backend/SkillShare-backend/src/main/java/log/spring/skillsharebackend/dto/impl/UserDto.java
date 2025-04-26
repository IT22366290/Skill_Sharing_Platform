package log.spring.skillsharebackend.dto.impl;

import log.spring.skillsharebackend.dto.status.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Status {
    private String username;
    private String email;
    private String profilePictureBase64;
    private String password;
}