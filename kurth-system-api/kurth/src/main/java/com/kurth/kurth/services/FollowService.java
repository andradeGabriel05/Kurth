package com.kurth.kurth.services;

import com.kurth.kurth.dto.FollowDTO;
import com.kurth.kurth.entities.Follow;
import com.kurth.kurth.repositories.FollowRepository;
import com.kurth.kurth.services.exceptions.DatabaseException;
import com.kurth.kurth.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Transactional
    public FollowDTO newFollow(FollowDTO followDTO) {

        try {
            Follow follow = new Follow();

            Long idFollower = followDTO.getUserFollowerId();
            Long idFollowing = followDTO.getUserFollowingId();

            Optional<Follow> alreadyFollow = followRepository.findByUserFollowerIdAndUserFollowingId(idFollower, idFollowing);

            if (alreadyFollow.isPresent()) {
                removeFollow(alreadyFollow.get().getId());
                return null;
            }

            follow.setUserFollowerId(idFollower);
            follow.setUserFollowingId(idFollowing);

            follow = followRepository.save(follow);
            return new FollowDTO(follow);

        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("[Service] Integrity violation.");

        }
    }

    @Transactional (propagation = Propagation.SUPPORTS)
    public ResponseEntity<Void> delete(Long id) {
        if(!followRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }

        followRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Transactional (propagation = Propagation.SUPPORTS)
    public void removeFollow(Long id) {
        followRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public FollowDTO userAlreadyFollowing(Long userFollowerId, Long userFollowingId) {
        Optional<Follow> followOptional = followRepository.userAlreadyFollowing(userFollowerId, userFollowingId);
        if (followOptional.isPresent()) {
            Follow follow = followOptional.get();
            return new FollowDTO(follow);
        }
        return null;
    }

    @Transactional(readOnly = true)
    public Page<FollowDTO> followers(Pageable pageable, Long id) {

        Page<Follow> followPageable = followRepository.followers(pageable, id);
        return followPageable.map(FollowDTO::new);
    }
}
