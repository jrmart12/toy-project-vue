package com.example.sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @RestController
    @CrossOrigin
    class CaffeineLevelRestController {

        String getCaffeineLevel() {
            List<String> givenList = Arrays.asList(
                    "Head on table asleep. Needs coffee now!",
                    "Not at all. What's wrong?!",
                    "Mildly. Boring.",
                    "Making progress.",
                    "Everything is awesome. Stuff is definitely happening.",
                    "Eyeballs are rolling around in my head and I'm shouting at my coworker about JHipster.",
                    "The LD50 of caffeine is 100 cups. Your developer has had 99 and is talking to the bike rack outside while jogging in place.");
            Random rand = new Random();
            String caffeineLevelString = givenList.get(rand.nextInt(givenList.size()));
            return caffeineLevelString;
        }

        @GetMapping("/howcaffeinatedami")
        public String getCaffeineLevel(Principal principal) {
            String userName = principal != null ? principal.getName() : "Anonymous";
            return userName + ", your developer's caffeine level is: " + getCaffeineLevel();
        }
    }
}
