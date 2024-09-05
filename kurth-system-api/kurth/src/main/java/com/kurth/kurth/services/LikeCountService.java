package com.kurth.kurth.services;

import com.kurth.kurth.dto.LikeCountDTO;
import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.entities.LikeCount;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.repositories.LikeCountRepository;
import com.kurth.kurth.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeCountService {

    @Autowired
    private LikeCountRepository likeCountRepository;


    @Transactional(readOnly = true)
    public LikeCountDTO findById(Long id) {

        LikeCount likeCount = likeCountRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Resource not found"));

        return new LikeCountDTO(likeCount);
    }

    @Transactional(readOnly = true)
    public Page<LikeCountDTO> findAll(Pageable pageable) {
        Page<LikeCount> likeCount = likeCountRepository.findAll(pageable);
        return likeCount.map(x -> new LikeCountDTO(x));
    }


}
