package log.spring.skillsharebackend.entity.impl;

import jakarta.persistence.*;
import log.spring.skillsharebackend.entity.enumClass.EventCategory;
import log.spring.skillsharebackend.entity.enumClass.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import log.spring.skillsharebackend.entity.SuperEntity;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "events")
public class EventEntity implements SuperEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    private String eventTitle;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    @Enumerated(EnumType.STRING)
    private EventCategory eventCategory;

    private LocalDate date;

    private LocalTime time;

    private String duration;
}
