package log.spring.skillsharebackend.dto.impl;

import log.spring.skillsharebackend.dto.status.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class SignInDto implements Status {
    private String email;
    private String password;
}
