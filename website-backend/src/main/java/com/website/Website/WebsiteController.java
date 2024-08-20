package com.website.Website;

import com.website.Website.mapper.UserMapper;
import com.website.Website.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class WebsiteController {
    @Autowired
    private UserMapper userMapper;

    @RequestMapping("/hello")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello, World!");
        return response;
    }
    @GetMapping("/user/{id}")
    public User getUserById(int id) {
        return userMapper.findById(id);
    }
}
