package PRO.devteam.API.mysqlaccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="api/event")
public class EventController {
    @Autowired
    private EventRepository eventRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Event> getAllEvents() { return eventRepository.findAll();}
}
