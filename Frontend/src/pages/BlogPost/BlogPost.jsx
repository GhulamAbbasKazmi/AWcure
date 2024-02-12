import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../utils/useWindowSize";
import "./BlogPost.css";
import { MDBBtn, MDBCardTitle, MDBCardText, MDBCardImage, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { blogs } from "../../utils/blogsData";
import useDynamicRefs from 'use-dynamic-refs';

import femaleAvatar from "../../assets/female-avatar-3.png";
import maleAvatar from "../../assets/male-avatar-1.png";

import {
  getBlogs, postBlog, updateBlog, updateBlogByUser
} from "../../features/blog/blogActions";

const BlogPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const { width, height } = useWindowSize();

  const inputElement = useRef();

  const [getRef, setRef] = useDynamicRefs();

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogObj = blogs?.filter((blog_) => blog_._id == id)[0]

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSection, setSelectedImageSection] = useState(null);
  const [blogTitleError, setBlogTitleError] = useState("");
  const [blogComment, setBlogComment] = useState("");
  const [blogReplies, setBlogReplies] = useState([]);
  var deletedSecImages = [];

  const [newBlog, setNewBlog] = useState({

    title: "",
    content: [{ heading: "", img: { imageToBase64: null, url: null }, text: "" }],
    feature_image: { imageToBase64: null, url: null },
    // likes: { count: 0, users: [{}] },
    // comments: [{ comment: "", user: {}, replies: [{ reply: "", user: {} }] },]
  });


  useEffect(() => {
    if (blogObj) {

      var content_ = []

      for (const contentSection of blogObj.blog.content) {

        var newContentSec = {
          ...contentSection,
          heading: contentSection.heading,
          img: {
            ...contentSection.img,
            // imageToBase64: null,
          },
          text: contentSection.text
        }
        content_.push(newContentSec)
      }

      setNewBlog({
        ...blogObj.blog,
        title: blogObj.blog.title,
        content: content_,
        feature_image: {
          ...blogObj.blog.feature_image,
          // imageToBase64: null 
        }
      })

      var replies_ = []

      blogObj?.blog?.comments?.map((commentObj, index) => {
        var newReply = { reply: "", index }
        replies_.push(newReply)
      })

      setBlogReplies(replies_)
    }

  }, [blogObj]);


  useEffect(() => {

    if (JSON.stringify(blogObj?.blog) == JSON.stringify(newBlog)) {
      addNewSectionHandler()
    }

  }, [newBlog]);


  useEffect(() => {
    if (selectedImage) {

      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setNewBlog({ ...newBlog, feature_image: { ...newBlog.feature_image, imageToBase64: reader.result, url: URL.createObjectURL(selectedImage) } })
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImageSection) {

      const reader = new FileReader();
      reader.readAsDataURL(selectedImageSection.file);
      reader.onloadend = () => {

        newBlog.content.splice(selectedImageSection.index, 1, { heading: newBlog.content[selectedImageSection.index].heading, img: { ...newBlog.content[selectedImageSection.index].img, imageToBase64: reader.result, url: URL.createObjectURL(selectedImageSection.file) }, text: newBlog.content[selectedImageSection.index].text })
        setNewBlog({ ...newBlog, content: newBlog.content })

      };
    }
  }, [selectedImageSection]);


  useEffect(() => {
    if (newBlog?.title == "") {
      setBlogTitleError("");
    } else if (newBlog?.title?.length < 8) {
      setBlogTitleError("Blog title should be atleast of 8 characters");
    } else {
      setBlogTitleError("");
    }
  }, [newBlog?.title]);


  const handleSubmitPostBlog = (e) => {
    e.preventDefault();

    if (newBlog.title == "") {
      setBlogTitleError("Blog title is empty");
    }
    if (
      blogTitleError == "" &&
      newBlog.title != ""
    ) {

      if (id) {
        dispatch(
          updateBlog({
            email: userInfo.email,
            blog: newBlog,
            id,
            deletedSecImages
          })
        );
      }
      else {

        dispatch(
          postBlog({
            email: userInfo.email,
            blog: newBlog
          })
        );
      }
      console.log("blog Create!");
    } else {
      console.log("Error!");
    }
  }

  const changeFeatureImage = () => {
    inputElement.current.click();
  };

  const changeSectionImage = (index) => {

    getRef(`${index}`).current.click();
  }

  const removeFeatureImage = () => {
    setSelectedImage(null);
    setNewBlog({ ...newBlog, feature_image: { ...newBlog.feature_image, imageToBase64: null, url: null } })
  };

  const removeSectionImage = (index) => {
    setSelectedImageSection(null)
    newBlog.content.splice(index, 1, { heading: newBlog.content[index].heading, img: { ...newBlog.content[index].img, imageToBase64: null, url: null }, text: newBlog.content[index].text })
    setNewBlog({ ...newBlog, content: newBlog.content })
  }

  const addNewSectionHandler = () => {
    setNewBlog({ ...newBlog, content: [...newBlog.content, { heading: "", img: { imageToBase64: null, url: null }, text: "" }] })
  }

  const deleteSectionHandler = (contentSectionIndex) => {

    deletedSecImages.push(newBlog.content[contentSectionIndex].img)
    newBlog.content.splice(contentSectionIndex, 1)
    setNewBlog({ ...newBlog, content: newBlog.content })
  }

  const updateSectionHeading = (e, contentSectionIndex) => {
    newBlog.content.splice(contentSectionIndex, 1, { heading: e.target.value, img: newBlog.content[contentSectionIndex].img, text: newBlog.content[contentSectionIndex].text })
    setNewBlog({ ...newBlog, content: newBlog.content })
  }

  const updateSectionText = (e, contentSectionIndex) => {
    newBlog.content.splice(contentSectionIndex, 1, { heading: newBlog.content[contentSectionIndex].heading, img: newBlog.content[contentSectionIndex].img, text: e.target.value })
    setNewBlog({ ...newBlog, content: newBlog.content })
  }

  const getDateTime = (date_) =>{
    const date = new Date(Date.parse(date_))
    const day = date.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" })
    const time = [date.getHours(), date.getMinutes(),].join(':')
    
    return {day, time}
  }

  // console.log('newBlog', newBlog)
  console.log('blogreplies', blogReplies)

  return (
    <div className="Blog-main">
      {location.pathname != "/blog/create" && !location.pathname.includes('/blog/update/') ?
        <>
          <p
            className="main-heading_"
            style={{
              fontWeight: "bolder",
              fontFamily: "sans-serif",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            {blogObj.blog?.title}
          </p>

          <img src={blogObj?.blog?.feature_image?.url} className="blog_post_image" />

          <div className="blog_post_content">
            {blogObj?.blog.content?.map((content_, index) => (
              <div className="contentSection" key={index}>
                <div className="headingContent">{content_.heading}</div>
                <div className={index % 2 == 0 ? "content_" : "content_reverse"}>
                  {content_.img.url != "" &&
                    <img className="contentImage" src={content_.img.url} />
                  }
                  <div className="contentText">{content_.text}</div>
                </div>
                <hr />
              </div>
            ))}

            <div className="blogInfoTopRow">
              <div className="likeContainer">

                {loadingBlog ?
                  <div className="my-3">
                    <MDBSpinner color="primary">
                      <span className="visually-hidden">Loading...</span>
                    </MDBSpinner> </div>

                  : userInfo == null ?
                    <MDBBtn className='me-1' color='success' onClick={() => navigate('/login')}>
                      <MDBIcon fas icon="sign-in-alt" />{" "}
                      Sign In to Like
                    </MDBBtn> :

                    blogObj.blog?.likes.users.some(userId => userId == userInfo?.id) ?
                      <MDBBtn className='me-1' color='warning' onClick={() => dispatch(updateBlogByUser({ id: blogObj?._id, email: userInfo?.email, like: false }))}>
                        <MDBIcon fas icon="thumbs-down" />{" "}
                        Un Like
                      </MDBBtn>
                      : <MDBBtn className='me-1' color='success' onClick={() => dispatch(updateBlogByUser({ id: blogObj?._id, email: userInfo?.email, like: true }))}>
                        <MDBIcon fas icon="thumbs-up" />{" "}
                        Like
                      </MDBBtn>
                }
              </div>
              <div className="blogUser">{blogObj.blog?.likes.count}{" "}Likes</div>

              <div className="blogUser">
                <MDBCardImage
                  src={
                    blogObj?.userId?.image?.url
                      ? blogObj?.userId?.image?.url
                      : blogObj?.userId?.gender == "female"
                        ? femaleAvatar
                        : maleAvatar
                  }
                  alt="avatar"
                  className="rounded-circle m-2"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  fluid
                />
                {blogObj?.userId?.username}</div>
              <div className="blogDate">{getDateTime(blogObj?.createdAt).time + "  " + getDateTime(blogObj?.createdAt).day}</div>
            </div>
          </div>
          <div className="blogInfoContainer">
            <div className="blogComments">
              <div className="commentsHeading">Comments</div>
              <div className="blogCommentWrite">
                <div className="commentInput">
                  <textarea className="contentTextArea"
                    value={blogComment}
                    onChange={(e) => setBlogComment(e.target.value)}
                    placeholder={"Comment Text"}
                  />
                </div>
                <div className="postComment">

                  {loadingBlog ?
                    <div className="my-3">
                      <MDBSpinner color="primary">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner> </div>

                    : userInfo == null ?
                      <MDBBtn className='me-1' color='success' onClick={() => navigate('/login')}>
                        <MDBIcon fas icon="sign-in-alt" />{" "}
                        Sign In to Post Comment
                      </MDBBtn> :
                      <MDBBtn className='me-1' color='primary' onClick={() => blogComment != "" && dispatch(updateBlogByUser({ id: blogObj?._id, email: userInfo?.email, comment: blogComment }))}>
                        Post Comment {" "}<MDBIcon fas icon="pencil-alt" />
                      </MDBBtn>}
                </div>
              </div>

              {
                blogObj.blog?.comments?.map((commentObj, index) => (

                  <div className="blogComment" key={index}>
                    <div className="commentTextContainer">
                      <div className="commentText">
                        {commentObj?.comment}
                      </div>

                      {loadingBlog ?
                        <div className="my-3">
                          <MDBSpinner color="primary">
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner> </div>
                        : (commentObj?.user?._id == userInfo?.id) &&
                        <MDBIcon 
                        onClick={() => dispatch(updateBlogByUser({ id: blogObj?._id, email: userInfo?.email, delete_comment_id: commentObj._id }))} 
                        className="delIconComment" fas icon="trash" />}

                    </div>
                    <div className="blogInfoTopRow">
                      <div className="blogUser">
                        <MDBCardImage
                          src={
                            commentObj?.user?.image?.url
                              ? commentObj?.user?.image?.url
                              : commentObj?.user?.gender == "female"
                                ? femaleAvatar
                                : maleAvatar
                          }
                          alt="avatar"
                          className="rounded-circle m-2"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          fluid
                        />
                        {commentObj?.user?.username}</div>
                      <div className="blogDate">{getDateTime(commentObj?.createdAt).time + "  " + getDateTime(commentObj?.createdAt).day}</div>
                    </div>
                    <div className="ReplyContainer">
                      <div className="replyWrite">
                        <div className="replyInput">
                          <textarea className="replyTextArea"
                            value={blogReplies[index]?.reply}
                            onChange={(e) => {
                              blogReplies.splice(index, 1, { reply: e.target.value, index })
                              setBlogReplies([...blogReplies])
                            }}
                            placeholder={"Reply Text"}
                          />
                        </div>
                        <div className="postReply">
                          {loadingBlog ?
                            <div className="my-3">
                              <MDBSpinner color="primary">
                                <span className="visually-hidden">Loading...</span>
                              </MDBSpinner> </div>
                            : userInfo == null ?
                              <MDBBtn className='me-1' color='success' onClick={() => navigate('/login')}>
                                <MDBIcon fas icon="sign-in-alt" />{" "}
                                Sign In to Post Reply
                              </MDBBtn> :
                              <MDBBtn className='replyBtn' color='primary' onClick={() => blogReplies[index].reply != "" && dispatch(updateBlogByUser({ id: blogObj?._id, email: userInfo?.email, comment_id: commentObj?._id, reply: blogReplies[index].reply }))}>
                                Post Reply {" "}<MDBIcon fas icon="pencil-alt" />
                              </MDBBtn>}
                        </div>
                      </div>

                      {commentObj?.replies?.map((replyObj, index) => (
                        <>
                          <div className="replyTextContainer" key={index}>
                            <div className="commentText">
                              {replyObj?.reply}
                            </div>
                            {loadingBlog ?
                        <div className="my-3">
                          <MDBSpinner color="primary">
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner> </div>
                        :
                        (replyObj?.user?._id == userInfo?.id) &&
                        <MDBIcon 
                        onClick={() => dispatch(updateBlogByUser({ id: blogObj?._id, email: userInfo?.email, comment_id: commentObj._id, delete_reply_id: replyObj?._id }))} 
                        className="delIconComment" fas icon="trash" />
                        
                        }
                          </div>
                          <div className="blogInfoTopRow">
                            <div className="blogUser">
                              <MDBCardImage
                                src={
                                  replyObj?.user?.image?.url
                                    ? replyObj?.user?.image?.url
                                    : replyObj?.user?.gender == "female"
                                      ? femaleAvatar
                                      : maleAvatar
                                }
                                alt="avatar"
                                className="rounded-circle m-2"
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                fluid
                              />
                              {replyObj?.user?.username}</div>
                            <div className="blogDate">{getDateTime(replyObj?.createdAt).time + "  " + getDateTime(replyObj?.createdAt).day}</div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </>
        :
        <>
          <input
            className="main-heading_Input"
            style={{
              fontWeight: "bolder",
              fontFamily: "sans-serif",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              padding: "1% 2%",
            }}
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            placeholder={width > 570 ? "Write your blog title here" : "Write Blog Title"}
          />
          {
            blogTitleError != "" &&
            <div className="Blog-field-error-mesage">
              {blogTitleError}
            </div>
          }

          {newBlog?.feature_image?.url != null ?

            <div className="blog_post_image_Container_feature" style={{
              backgroundImage: `url(${newBlog?.feature_image?.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}>
              <div className="topRowFeatureImage">
                <MDBIcon fas icon="edit" size="2x" className="editIconFeatureImage" onClick={changeFeatureImage} />
                <MDBIcon fas icon="trash" size="2x" className="delIconFeatureImage" onClick={removeFeatureImage} />
              </div>
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                ref={inputElement}
                onChange={(e) => {
                  setSelectedImage(e.target.files[0]);
                  e.target.value = null;
                }}
              />
            </div>
            :
            <div className="blog_post_image_Container" onClick={changeFeatureImage}>
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                ref={inputElement}
                onChange={(e) => {
                  setSelectedImage(e.target.files[0]);
                  e.target.value = null;
                }}
              />
              + Add Feature Image
            </div>
          }

          <div className="blog_post_content">
            {newBlog?.content?.map((content_, index) => (
              <div className="contentSection" key={index}>

                <div className="secTopRow">
                  <input className="headingContentInput"
                    value={content_.heading}
                    onChange={(e) => updateSectionHeading(e, index)}
                    placeholder={"Section Heading"}
                  />
                  <MDBIcon className="secDelIcon" far icon="trash-alt" onClick={() => deleteSectionHandler(index)} />
                </div>

                <div className={index % 2 == 0 ? "content_" : "content_reverse"}>

                  {content_?.img?.url != null ?

                    <div className="contentImageContainer_Image" style={{
                      backgroundImage: `url(${content_?.img?.url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center"
                    }}>
                      <div className="topRowSectionImage">
                        <MDBIcon fas icon="edit" className="editIconFeatureImage" onClick={() => changeSectionImage(index)} />
                        <MDBIcon fas icon="trash" className="delIconFeatureImage" onClick={() => removeSectionImage(index)} />
                      </div>

                      <input
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{ display: "none" }}
                        ref={setRef(`${index}`)}
                        onChange={(e) => {
                          setSelectedImageSection({ file: e.target.files[0], index });
                          e.target.value = null;
                        }}
                      />
                    </div>

                    :
                    <div className="contentImageContainer" onClick={() => changeSectionImage(index)}>
                      <input
                        key={index}
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{ display: "none" }}
                        ref={setRef(`${index}`)}
                        onChange={(e) => {
                          setSelectedImageSection({ file: e.target.files[0], index });
                          e.target.value = null;
                        }}
                        className="secInput"
                      />
                      + Add Section Image
                    </div>
                  }

                  {/* <img className="contentImage" src={content_?.img} /> */}
                  <textarea className="contentTextArea"
                    value={newBlog.content[index].text}
                    onChange={(e) => updateSectionText(e, index)}
                    placeholder={"Section Text"}
                  />
                </div>
                <hr />
              </div>
            ))}
            <MDBBtn
              className="btn-rounded heroSecBtn-2"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px"

              }}
              onClick={addNewSectionHandler}
            >
              + Add new Section
            </MDBBtn>
          </div>
          {

            loadingBlog ?
              <div className="my-3">
                <MDBSpinner color="primary">
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner> </div> :

              <MDBBtn
                className="btn-rounded heroSecBtn-1"
                style={{
                  width: "70%",
                  margin: "2rem",
                  fontWeight: "bolder"
                }}
                onClick={handleSubmitPostBlog}
              >
                {location.pathname.includes('/blog/update/') ? 'Update ' : 'Post '}Blog
              </MDBBtn>
          }

          {errorBlog && (
            <div className="text-danger text-center mb-2">
              {errorBlog}{" "}
              <i className="fas fa-exclamation-triangle text-danger"></i>
            </div>)
          }

          {(successBlog == 'Blog has been posted successfully!' || successBlog == 'Blog has been updated successfully!') && (
            <div className="text-success text-center mb-2">
              {successBlog}{" "}
              <i className="fas fa-exclamation-triangle text-success"></i>
            </div>)
          }
        </>
      }
    </div >
  );
};
export default BlogPost;
