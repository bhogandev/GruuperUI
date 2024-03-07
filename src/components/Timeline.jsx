import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import bbvapi, { getUserTimeline } from '../middleware/BBVAPI';
import Cookie from 'universal-cookie';
import Post from './Post';
import CreatePostForm from './CreatePostForm';
import { Container } from 'react-bootstrap'
import { REFRESH_TOKEN, RESPONSE_BODY, RESPONSE_MESSAGE, SUCCESS, TOKEN, USERNAME_KEY, USER_TOKEN } from '../middleware/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimelineData } from '../app/features/TimeLineSlice';

export default function Timeline({ token, rtoken, userName }) {
    const posts = useSelector((state) => state.timeline.posts);
    const [updateTimeline, setUpdateTimeline] = useState(false);
    const postPage = useSelector((state) => state.timeline.page);
    const [errors, setErrors] = useState('');

    const isInitialMount = useRef(true);

    const dispatch = useDispatch();

    const GetTL = useCallback(async () => {

        try {
            dispatch(fetchTimelineData(token, rtoken, postPage + 1, userName));
            
        } catch (ex) {
            console.log(ex);
        }
    }, [token, rtoken, postPage, userName]);

    useEffect(() => {
        if (isInitialMount.current) {
            console.log('here');
            GetTL();
            isInitialMount.current = false;
        } else {
            const errors = document.getElementById("errors");
            if (errors) {
              
            }
        }
    }, [GetTL]);

    const postList = useMemo(() => posts, [posts]);

    if (postList && postList.length > 0) {
        return (
            <Container

style={{ textAlign: "left" }}>
<h1>{postList}</h1>
</Container>
);
}
return (
<div>
    <div>{errors}</div>
    <p>Loading...</p>
</div>
);
}