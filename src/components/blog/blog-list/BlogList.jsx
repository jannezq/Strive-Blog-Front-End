import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/blogPosts");

      if (response.ok) {
        let allBlogPost = await response.json();
        setBlogPosts(allBlogPost);
        console.log("Blogs: ", allBlogPost);
      } else {
        console.log("Error in fetching!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      {blogPosts.map((post) => (
        <Col
          key={post.id}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
