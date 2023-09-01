package com.example.authentication_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExampleController {

    @GetMapping("/register")
    public ResponseEntity<String> register() {
        return ResponseEntity.ok("hello");
    }

//    @PostMapping("/authenticate")
//    public ResponseEntity<AuthenticationResponse> authenticate(
//            @RequestBody AuthenticationRequest request
//    ) {
//        return ResponseEntity.ok(authenticationService.authentication(request));
//    }
}
