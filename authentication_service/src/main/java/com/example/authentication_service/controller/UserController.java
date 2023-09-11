package com.example.authentication_service.controller;

import com.example.authentication_service.domain.User;
import com.example.authentication_service.service.UserService;
import com.example.authentication_service.response.EntityResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        logger.info("here!");
        userService.register(user);
        return new ResponseEntity(
                new EntityResponse("User registered!"), HttpStatus.OK
        );
    }

    @GetMapping("/getPersonById/{id}")
    public ResponseEntity<?> getPersonById(@PathVariable Long id) {
        Optional<User> person = userService.getUserById(id);
        if(person.isEmpty())
        {
            return new ResponseEntity<>(
                    new EntityResponse("There is no user with that id!"), HttpStatus.NOT_FOUND
            );
        }
        else {

            return new ResponseEntity<>(
                    person.get(), HttpStatus.OK
            );
        }
    }

    @GetMapping(value = "/getAllPersons")
    public ResponseEntity<?> getAllPersons() {
        Optional<List<User>> allPersons = userService.getAllPersons();
        if(!allPersons.isEmpty())
        {
            return new ResponseEntity<>(
                    allPersons, HttpStatus.OK
            );
        }
        else {
            return new ResponseEntity<>(
                    new EntityResponse("There are no users!"), HttpStatus.NOT_FOUND
            );
        }
    }

}
