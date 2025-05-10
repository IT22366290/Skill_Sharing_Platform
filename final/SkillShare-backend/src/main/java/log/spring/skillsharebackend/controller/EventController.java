package log.spring.skillsharebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import log.spring.skillsharebackend.ImageConverter;
import log.spring.skillsharebackend.dto.impl.EventDto;
import log.spring.skillsharebackend.entity.enumClass.EventCategory;
import log.spring.skillsharebackend.entity.enumClass.EventType;
import log.spring.skillsharebackend.entity.impl.EventEntity;
import log.spring.skillsharebackend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventEntity> createEvent(
            HttpServletRequest request,
            @RequestPart("userId") String userId,
            @RequestPart("eventTitle") String eventTitle,
            @RequestPart("description") String description,
            @RequestPart("eventType") String eventType,
            @RequestPart("eventCategory") String eventCategory,
            @RequestPart("date") String date,
            @RequestPart("time") String time,
            @RequestPart("duration") String duration,
            @RequestPart("image") MultipartFile image
    ) {
        try {
            String base64Image = ImageConverter.convertImage(image);
            EventDto dto = new EventDto(
                    userId,
                    base64Image,
                    eventTitle,
                    description,
                    Enum.valueOf(EventType.class, eventType.toUpperCase()),
                    Enum.valueOf(EventCategory.class, eventCategory.toUpperCase()),
                    LocalDate.parse(date),
                    LocalTime.parse(time),
                    duration
            );
            return new ResponseEntity<>(eventService.createEvent(dto), HttpStatus.CREATED);
        } catch (IOException e) {
            throw new RuntimeException("Image conversion failed", e);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventEntity> updateEvent(
            @PathVariable Long id,
            @RequestPart("userId") String userId,
            @RequestPart("eventTitle") String eventTitle,
            @RequestPart("description") String description,
            @RequestPart("eventType") String eventType,
            @RequestPart("eventCategory") String eventCategory,
            @RequestPart("date") String date,
            @RequestPart("time") String time,
            @RequestPart("duration") String duration,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            String base64Image = (image != null && !image.isEmpty()) ? ImageConverter.convertImage(image) : null;

            EventDto dto = new EventDto(
                    userId,
                    base64Image,
                    eventTitle,
                    description,
                    Enum.valueOf(EventType.class, eventType.toUpperCase()),
                    Enum.valueOf(EventCategory.class, eventCategory.toUpperCase()),
                    LocalDate.parse(date),
                    LocalTime.parse(time),
                    duration
            );

            return new ResponseEntity<>(eventService.updateEvent(id, dto, image), HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException("Image conversion failed", e);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping
    public ResponseEntity<List<EventEntity>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventEntity> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventEntity>> getEventsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(eventService.getEventsByUserId(userId));
    }
}
