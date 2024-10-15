package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("SELECT obj FROM User obj WHERE obj.username = :username AND obj.password = :password")
    Optional<User> login(String username, String password);

    @Modifying
    @Query("UPDATE User obj SET obj.followers = obj.followers + 1 WHERE obj.id = :id")
    Integer updateFollower(@Param("id") Long id);

    @Modifying
    @Query("UPDATE User obj SET obj.following = obj.following + 1 WHERE obj.id = :id")
    Integer updateFollowing(@Param("id") Long id);

    @Modifying
    @Query("UPDATE User obj SET obj.followers = obj.followers - 1 WHERE obj.id = :id")
    Integer updateRemoveFollower(@Param("id") Long id);

    @Modifying
    @Query("UPDATE User obj SET obj.following = obj.following - 1 WHERE obj.id = :id")
    Integer updateRemoveFollowing(@Param("id") Long id);

}
