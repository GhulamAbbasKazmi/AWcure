import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../utils/useWindowSize";
import "./Blog.css";
import { MDBCol, MDBBtn, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { blogs } from "../../utils/blogsData";
import {
  getBlogs
} from "../../features/blog/blogActions";

const Blog = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const {
    loading,
    userInfo,
  } = useSelector((state) => state.user);

  const {
    loading: loadingBlog,
    blogs,
    success: successBlog,
    error: errorBlog
  } = useSelector((state) => state.blog);


  useEffect(() => {
    dispatch(getBlogs())
  }, []);

  return (
    <div className="Blog-main">
      <p
        style={{
          fontSize: "4rem",
          marginTop: "2rem",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        Blog!
      </p>

      {userInfo != null &&
        <MDBCol md="6" className="d-flex align-items-center justify-content-center">
          <MDBBtn
            className="btn-rounded heroSecBtn-2"
            style={{
              width: "70%",
            }}
            onClick={() => navigate('/blog/create')}
          >
            Create a Blog
          </MDBBtn>
        </MDBCol>
      }

      <div className="Blog-content">
        {blogs?.map((blogObj, index) => (

          <div className="blog-post-card p-3 my-2" key={index}>
            {index % 2 == 0 || (index % 2 == 1 && width <= 996) ? (
              <img src={blogObj.blog.feature_image.url} className="home-blog-image" />
            ) : null}
            <div className="blog-post-text-container text-white">
              <MDBCardTitle className="fw-bold">
                {blogObj.blog.title}
              </MDBCardTitle>
              <MDBCardText className="my-3">
                {blogObj.blog.content[0].heading + ' ...'}
              </MDBCardText>

              <div className="BlogBtnContainer">
                <MDBBtn className="blogCardBtn" onClick={() => navigate(`/blog/${blogObj._id}`)}
                >Read More</MDBBtn>
                {userInfo?.id === blogObj?.userId?._id &&
                  <MDBBtn className="blogCardBtn" onClick={() => navigate(`/blog/update/${blogObj._id}`)}
                  >Edit </MDBBtn>
                }
              </div>
            </div>
            {index % 2 == 1 && width > 996 ? (
              <img src={blogObj.blog.feature_image.url} className="home-blog-image" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;
