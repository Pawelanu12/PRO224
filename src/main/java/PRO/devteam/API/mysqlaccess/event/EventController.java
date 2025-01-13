package PRO.devteam.API.mysqlaccess.event;

import PRO.devteam.API.mysqlaccess.attendence.AttendenceRepository;
import PRO.devteam.API.mysqlaccess.user.User;
import PRO.devteam.API.mysqlaccess.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Optional;

@Controller
@RequestMapping(path="/api")
public class EventController {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AttendenceRepository attendenceRepository;

    @GetMapping(path="/wydarzenia")
    public ResponseEntity< Iterable<Event>> getAllEvents() {
        return new ResponseEntity<>(eventRepository.findAll(),HttpStatus.OK);
    }

    @GetMapping(path="/wydarzenia/{eventId}")
    public ResponseEntity< Optional<Event>> getEventById(@PathVariable(value = "eventId") BigInteger eventId)
    {
        if (!eventRepository.existsById(eventId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(eventRepository.findById(eventId), HttpStatus.OK);
    }

    @GetMapping(path="/uzytkownicy/{userId}/wydarzenia")
    public ResponseEntity<Iterable<Event>> getEventsForUserId(@PathVariable(value = "userId") BigInteger userId){
        if (!userRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Iterable<Event> attendedEvents = eventRepository.findAttendanceByUsersId(userId);
        return new ResponseEntity<>(attendedEvents, HttpStatus.OK);
    }

    @GetMapping(path="/wydarzenia/{eventID}/uczestnicy")
    public ResponseEntity<Iterable<User>> getEventParticipants(@PathVariable(value = "eventId") BigInteger eventId)
    {
        if (!eventRepository.existsById(eventId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Iterable<User> attendingUsers = userRepository.findUserByAttendanceId(eventId);
        return new ResponseEntity<>(attendingUsers, HttpStatus.OK);
    }


    @PostMapping(path="/wydarzenia")
    public ResponseEntity<Event> postNewEvent(@RequestBody Event givenEvent)
    {
        Event event = eventRepository.save(new Event(
                givenEvent.getUzytkownikId(), givenEvent.getNazwa(), givenEvent.getDataWyjazdu(),
                givenEvent.getDataZakonczenia(), givenEvent.getOpis()
        ));
        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @PostMapping("/uzytkownicy/{userId}/wydarzenia/{eventId}")
    public ResponseEntity<Event> postNewEventToUser(@PathVariable(value = "userId") BigInteger userId, @PathVariable(value="eventId") BigInteger eventId) {
        Event responseEvent = userRepository.findById(userId).map(user-> {
            Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing event", null,"Not found event with id = " + eventId ));
            user.addAttendence(event);
            userRepository.save(user);
            return event;
        }).orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing user", null,"Not found a user with id = " + userId ));

        return new ResponseEntity<>(responseEvent, HttpStatus.ACCEPTED);
    }

    @PutMapping(path="/wydarzenia/{eventId}")
    public ResponseEntity<Event> putEvent(@PathVariable(value = "eventId") BigInteger eventId, @RequestBody Event givenEvent){
        if (!eventRepository.existsById(eventId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing event", null,"Not found event with id = " + eventId ));
        event.setUzytkownikId(givenEvent.getUzytkownikId());
        event.setNazwa(givenEvent.getNazwa());
        event.setDataWyjazdu(givenEvent.getDataWyjazdu());
        event.setDataZakonczenia(givenEvent.getDataZakonczenia());
        event.setOpis(givenEvent.getOpis());
        return new ResponseEntity<>(eventRepository.save(event), HttpStatus.OK);
    }

    @DeleteMapping("/uzytkownicy/{userId}/wydarzenia/{eventId}")
    public ResponseEntity<HttpStatus> deleteEventFromUser(@PathVariable(value = "userId") BigInteger userId, @PathVariable(value = "eventId") BigInteger eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidConfigurationPropertyValueException("missing user", null,"Not found a user with id = " + userId ));

        user.removeAttendence(eventId);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/wydarzenia/{eventId}")
    public ResponseEntity<HttpStatus> deleteEvent(@PathVariable("eventId") BigInteger eventId) {
        eventRepository.deleteById(eventId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
