import React, { useEffect, useRef, useState } from 'react'
import '../styles/App.css'
import PostItem from '../components/PostItem'
import PostList from '../components/POstList';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import { useMemo } from 'react';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal.jsx'
import { usePosts } from '../components/hooks/usePosts';
import axios from 'axios'
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/loader';
import { useFetching } from '../components/hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/page';
import Pegination from '../components/UI/pagination/Pagination';

function Posts() {
  
  const[posts, setPosts] = useState([
    {id:1, title: 'T', body: 'Dwwq'},
    {id:2, title: 'W', body: 'Omaswws'},
    {id:3, title: 'D', body: 'S'},
  ])
    const[filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const sortedAndSearcherPosts = usePosts(posts, filter.sort, filter.query);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1)

    const lastElement = useRef()
    console.log(lastElement);

    let pagesArray = getPagesArray(totalPages);
    
    console.log([pagesArray]);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async() =>{
      const response = await PostService.getAll(limit, page)
      setPosts([...posts, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
    })

    console.log(totalPages);
  

  useEffect(() =>{
    fetchPosts(limit, page)
  }, [page])

  

    const createPost = (newPost) =>{
      setPosts([...posts, newPost])
      setModal(false)
    }


    const removePost =(post) =>{
      setPosts(posts.filter(p => p.id !== post.id))
    }
    const changePage = (page) =>{
      setPage(page)

    }



  return (
    <div className='App'>
      <MyButton style={{marginTop: '20px'}} onClick={() => setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost}/></MyModal>
      
      <hr style={{margin:'15px 0'}}></hr>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {postError &&
        <h1>Error :(</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearcherPosts} title={'list of posts about JS'}/>
      {isPostsLoading &&
        <div ref={lastElement} style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
      }

      <Pegination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
        />
      

      
      
    </div>
  );
}

export default Posts;