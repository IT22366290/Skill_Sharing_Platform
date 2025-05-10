package log.spring.skillsharebackend.service.impl;

import jakarta.transaction.Transactional;
import log.spring.skillsharebackend.ImageConverter;
import log.spring.skillsharebackend.dao.EventDao;
import log.spring.skillsharebackend.dto.impl.EventDto;
import log.spring.skillsharebackend.entity.impl.EventEntity;
import log.spring.skillsharebackend.exception.ItemNotFoundException;
import log.spring.skillsharebackend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class EventServiceImpl implements EventService {

    @Autowired
    private EventDao eventDao;

    @Override
    public EventEntity createEvent(EventDto dto) {
        EventEntity event = new EventEntity(
                null,
                dto.getUserId(),
                dto.getImage(),
                dto.getEventTitle(),
                dto.getDescription(),
                dto.getEventType(),
                dto.getEventCategory(),
                dto.getDate(),
                dto.getTime(),
                dto.getDuration()
        );
        return eventDao.save(event);
    }

    @Override
    public List<EventEntity> getAllEvents() {
        return eventDao.findAll();
    }

    @Override
    public EventEntity getEventById(Long id) {
        return eventDao.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Event not found with ID: " + id));
    }

    @Override
    public EventEntity updateEvent(Long id, EventDto dto, MultipartFile image) throws IOException {
        EventEntity event = getEventById(id);
        event.setUserId(dto.getUserId());
        event.setEventTitle(dto.getEventTitle());
        event.setDescription(dto.getDescription());
        event.setEventType(dto.getEventType());
        event.setEventCategory(dto.getEventCategory());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());
        event.setDuration(dto.getDuration());

        if (image != null && !image.isEmpty()) {
            event.setImage(ImageConverter.convertImage(image));
        }

        return eventDao.save(event);
    }

    @Override
    public void deleteEvent(Long id) {
        EventEntity event = getEventById(id);
        eventDao.delete(event);
    }

    @Override
    public List<EventEntity> getEventsByUserId(String userId) {
        return eventDao.findByUserId(userId);
    }
}
