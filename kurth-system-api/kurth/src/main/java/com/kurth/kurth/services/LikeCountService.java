package com.kurth.kurth.services;

import com.kurth.kurth.repositories.LikeCountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeCountService {

    @Autowired
    private LikeCountRepository likeCountRepository;




}
