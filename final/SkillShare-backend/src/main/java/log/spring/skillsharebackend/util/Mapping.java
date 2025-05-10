package log.spring.skillsharebackend.util;

import log.spring.skillsharebackend.dto.impl.UserDto;
import log.spring.skillsharebackend.entity.impl.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Mapping {

    @Autowired
    private ModelMapper modelMapper;




}
