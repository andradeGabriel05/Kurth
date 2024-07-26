package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.ReplyDTO;
import com.kurth.kurth.services.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

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

    @GetMapping("/message/{id}")
    public ResponseEntity<Page<ReplyDTO>> findAllByMessageId(@PathVariable Long id, Pageable pageable) {
        Page<ReplyDTO> replyDTO = replyService.findAllByMessageId(id, pageable);
        return ResponseEntity.ok(replyDTO);
    }

    @PostMapping
    public ResponseEntity<ReplyDTO> newReply(@RequestBody ReplyDTO replyDTO) {
        replyDTO = replyService.newReply(replyDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(replyDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(replyDTO);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ReplyDTO> updateReply(@PathVariable Long id, @RequestBody ReplyDTO replyDTO) {
        replyDTO = replyService.updateReply(id, replyDTO);
        return ResponseEntity.ok(replyDTO);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<ReplyDTO> deleteReply(@PathVariable long id) {
        replyService.deleteReply(id);
        return ResponseEntity.noContent().build();
    }

}
