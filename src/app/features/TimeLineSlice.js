import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import Post from '../../components/Post';
import { getUserTimeline } from '../../middleware/BBVAPI';
import { RESPONSE_BODY, RESPONSE_MESSAGE, SUCCESS } from '../../middleware/types';

const initialState = {
  posts: [],
  page: 0,
  loading: false,
  error: null
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    fetchTimelineStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTimelineSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchTimelineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // Assuming the new post should be added at the beginning
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
    editPageNum: (state, action) => {
        state.page = action.payload;
    }
    // Other actions as needed (e.g., editPost, likePost, etc.)
  }
});

export const {
  fetchTimelineStart,
  fetchTimelineSuccess,
  fetchTimelineFailure,
  addPost,
  removePost,
  editPageNum
  // Export other actions here if needed
} = timelineSlice.actions;

export default timelineSlice.reducer;

// Async thunk action to fetch timeline data from the server
export const fetchTimelineData = (userToken, refreshToken, pageNum, uName) => async (dispatch, getState) => {
  dispatch(fetchTimelineStart());
  try {
    // Make API call to fetch timeline data
    const response = await getUserTimeline(userToken, refreshToken, pageNum);
    var posts = [];

    if (response[RESPONSE_MESSAGE] !== SUCCESS) {
        //return error to timeline
        throw response[0]['DEFAULT_ERROR'].Description;
    } else {
        const jsonResponse = JSON.parse(response[RESPONSE_BODY]);
        const postList = jsonResponse.map(post => {
            const parsedCExt = post.CommentsExt;
            const isOwner = post.Username === uName;
           
            return (
                <Post key={post.PostId} PostId={post.PostId} Username={post.Username} CreateDateTime={post.CreateDateTime} Body={post.Body} Attachments={post.Attachments} Likes={post.Likes} IsLiked={post.LikeStatus} Comments={post.Comments} CExt={JSON.parse(post.CommentsExt)} isOwner={isOwner} />
            )
        })
        posts = postList;
    }

    dispatch(fetchTimelineSuccess(posts));
    dispatch(editPageNum(pageNum));
  } catch (error) {
    dispatch(fetchTimelineFailure(error.message));
  }
};
