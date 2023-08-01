import React from 'react'
import MySelect from './UI/select/Myselect';
import MyInput from './UI/input/MyInput';

const PostFilter = ({filter, setFilter}) =>{
    return(
        <div>
        <MyInput
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          placeholder='search'></MyInput>
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="sort on"
          options={[
            {value: 'title', name: 'on names'},
            {value: 'body', name: 'on disription'}
          ]}></MySelect>
      </div>
    )
}
export default PostFilter