import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";

const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  console.log("this is params ", params);

  const getBlogPosts = async (id) => {
    console.log("this is ID: ", id);
    try {
      let response = await fetch(`http://localhost:3001/blogPosts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
        setLoading(false);
        console.log("this is blog details: ", blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { id } = params;
    getBlogPosts(id);
    // const blog = posts.find((post) => post._id.toString() === id);

    // if (blog) {
    //   setBlog(blog);
    //   setLoading(false);
    // } else {
    //   navigate("/404");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
