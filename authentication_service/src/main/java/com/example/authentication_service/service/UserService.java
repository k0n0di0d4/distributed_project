package com.example.authentication_service.service;


import com.example.authentication_service.domain.User;
import com.example.authentication_service.repository.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {


    private UserRepository userRepository;

    private final EntityManager entityManager;

    public UserService(EntityManager entityManager, UserRepository userRepository) {
        this.entityManager = entityManager;
        this.userRepository = userRepository;
    }


    public void register(User user) {
        userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        Optional<User> user;
        user = userRepository.findById(id);

        return user;
    }

    public void removePerson(User user) {
        entityManager.remove(user);
    }

    public Optional<List<User>> getAllPersons() {
        Optional<List<User>> person;

        try {
            person = Optional.of(entityManager.createQuery(
                            "SELECT _user FROM User _user", User.class)
                    .getResultList());
        } catch (NoResultException noResultException) {
            person = Optional.empty();
        }
        return person;
    }

}
