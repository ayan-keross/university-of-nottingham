package com.ikon.uon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikon.uon.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public List<?> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
    

}
