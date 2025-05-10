package log.spring.skillsharebackend.dto.impl;

import log.spring.skillsharebackend.dto.SuperDto;
import log.spring.skillsharebackend.entity.enumClass.EventCategory;
import log.spring.skillsharebackend.entity.enumClass.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDto implements SuperDto {

    private String userId;
    private String image; // Base64
    private String eventTitle;
    private String description;
    private EventType eventType;
    private EventCategory eventCategory;
    private LocalDate date;
    private LocalTime time;
    private String duration;
}
