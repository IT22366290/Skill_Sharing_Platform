package log.spring.skillsharebackend.service;

import log.spring.skillsharebackend.dto.impl.EventDto;
import log.spring.skillsharebackend.entity.impl.EventEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface EventService {
    EventEntity createEvent(EventDto dto) throws IOException;
    List<EventEntity> getAllEvents();
    EventEntity getEventById(Long id);
    EventEntity updateEvent(Long id, EventDto dto, MultipartFile image) throws IOException;
    void deleteEvent(Long id);
    List<EventEntity> getEventsByUserId(String userId);
}
