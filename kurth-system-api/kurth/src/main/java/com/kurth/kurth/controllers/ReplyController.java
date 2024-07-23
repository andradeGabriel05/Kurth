package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.ReplyDTO;
import com.kurth.kurth.services.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ReplyDTO> findById(@PathVariable long id) {
        ReplyDTO replyDTO = replyService.findById(id);
        return ResponseEntity.ok(replyDTO);
    }

    @GetMapping
    public ResponseEntity<Page<ReplyDTO>> findAll(Pageable pageable) {
        Page<ReplyDTO> replyDTO = replyService.findAll(pageable);
        return ResponseEntity.ok(replyDTO);
    }

}
