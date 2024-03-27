'use client';

import {useState, useEffect} from "react";

import PromptCard from "@components/PromptCard";

const PromptCardList = ({data, handleTagClick }) => {
  return (
    <div className={"mt-16 prompt_layout"}>
      {data.map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    const filtered = posts.filter(post => {
      // Check if post content, tags, or username includes the search text
      const isInContent = post.prompt && post.prompt.toLowerCase().includes(value.toLowerCase());
      const isInTags = post.tag && post.tag.toLowerCase().includes(value.toLowerCase());
      const isInUsername = post.creator.username && post.creator.username.toLowerCase().includes(value.toLowerCase());

      return isInContent || isInTags || isInUsername;
    });
    setFilteredPosts(filtered);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className={"feed"}>
      <form className={"relative w-full flex-center"}>
        <input type="text" placeholder={"Search"} value={searchText} onChange={handleSearchChange} required
               className={"search_input peer"}
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick = {() => {}}/>
    </section>
  )
}

export default Feed