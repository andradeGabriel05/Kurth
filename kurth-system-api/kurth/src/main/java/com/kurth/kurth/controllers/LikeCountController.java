package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.LikeCountDTO;
import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.services.LikeCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/likecount")
public class LikeCountController {

    @Autowired
    private LikeCountService likeCountService;

    @GetMapping(value = "/{id}")
    public LikeCountDTO findById(@PathVariable Long id) {
        return likeCountService.findById(id);
    }

    @GetMapping
    public ResponseEntity<Page<LikeCountDTO>> findAll(Pageable pageable) {
        Page<LikeCountDTO> likeCountDTO = likeCountService.findAll(pageable);
        return ResponseEntity.ok(likeCountDTO);
    }
}
