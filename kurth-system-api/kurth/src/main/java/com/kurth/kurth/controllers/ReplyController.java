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

// this is actually also a post. so, instead of a new table, we should do a self-relation at post table.
// create a new att to identify the type -> "reply" or "post". but, how could it be the fk?
@RestController
@RequestMapping(value = "/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @GetMapping(value = "/excluded-route/{id}")
    public ResponseEntity<ReplyDTO> findById(@PathVariable long id) {
        ReplyDTO replyDTO = replyService.findById(id);
        return ResponseEntity.ok(replyDTO);
    }

    @GetMapping
    public ResponseEntity<Page<ReplyDTO>> findAll(Pageable pageable) {
        Page<ReplyDTO> replyDTO = replyService.findAll(pageable);
        return ResponseEntity.ok(replyDTO);
    }

    @GetMapping("/excluded-route/message/{id}")
    public ResponseEntity<Page<ReplyDTO>> findAllByMessageId(@PathVariable Long id, Pageable pageable) {
        Page<ReplyDTO> replyDTO = replyService.findAllByMessageId(id, pageable);
        return ResponseEntity.ok(replyDTO);
    }

//    @GetMapping("/message-count/{id}")
    @GetMapping("/excluded-route")
    public Integer countReplyMessages(@PathVariable Long id) {
        return replyService.countReplyMessages(id);
    }

    @PostMapping
    public ResponseEntity<ReplyDTO> newReply(@RequestBody ReplyDTO replyDTO) {
        replyDTO = replyService.newReply(replyDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(replyDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(replyDTO);
    }

    @PutMapping(value = "/b/excluded-route{id}")
    public ResponseEntity<ReplyDTO> updateReply(@PathVariable Long id, @RequestBody ReplyDTO replyDTO) {
        replyDTO = replyService.updateReply(id, replyDTO);
        return ResponseEntity.ok(replyDTO);
    }

    @DeleteMapping(value = "/a/excluded-route{id}")
    public ResponseEntity<ReplyDTO> deleteReply(@PathVariable long id) {
        replyService.deleteReply(id);
        return ResponseEntity.noContent().build();
    }

}
