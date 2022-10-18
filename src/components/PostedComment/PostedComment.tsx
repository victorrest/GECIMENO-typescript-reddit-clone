import React, { MouseEventHandler, Dispatch, SetStateAction, useState } from 'react';
import { Comment, Post, Subreddit } from '../../types/types';
import EditComment from '../EditComment/EditComment';
import './PostedComment.scss';

export interface PostedCommentProps {
    index: number,
    handleHoverComment: MouseEventHandler,
    handleLikeComment: MouseEventHandler,
    handleNestedComment: MouseEventHandler,
    hoveredComments: any,
    commentObj: Comment,
    noFurtherNesting?: boolean,
    mainComment: string,
    targetedComment: Comment,
    writeComment: any,
    submitComment: MouseEventHandler,
    currentSub: Subreddit | undefined,
    currentPost: Post,
    nested: boolean,
    setIndex: Dispatch<SetStateAction<number | undefined>>,
    writeNestedComment: any,
    submitNestedComment: MouseEventHandler,
    currentEditedComment: string,
}

export default function PostedComment (props: PostedCommentProps) {
  const {
    index,
    handleHoverComment,
    handleLikeComment,
    handleNestedComment,
    hoveredComments,
    mainComment,
    noFurtherNesting,
    commentObj,
    targetedComment,
    currentPost,
    writeComment,
    submitComment,
    currentSub,
    nested,
    setIndex,
    writeNestedComment,
    submitNestedComment,
    currentEditedComment
  } = props;

  const [hover, setHover] = useState({
    upvote: false,
    downvote: false
  })

  const handleHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.id === "upvote") {
        setHover({
            upvote: !hover.upvote,
            downvote: hover.downvote
        });
    } else if (target.id === "downvote") {
        setHover({
            upvote: hover.upvote,
            downvote: !hover.downvote
        });
    }
  }

  return (
    <div className="comment" id={`${index}`}>
        <div className="comment-header">
            <img className="comment-avatar" src={require("../../resources/images/avatar3.PNG")} />
            <h4 className="comment-author">{nested ? commentObj.nested_comments[0].author : commentObj.author}</h4>
            <h4 className="comment-timestamp">· {nested ? commentObj.nested_comments[0].time : commentObj.time}</h4>
        </div>

        <div className="comment-content-container">
            <div className="comment-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
            <div className="right">
                <p id="content">{nested ? commentObj.nested_comments[0].content : commentObj.content}</p>
                <div className="comment-footer">
                    <button className={nested ? `${index} nested` : `${index}`} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={handleLikeComment} id="upvote">
                        <img className="upvote" src={require(`../../resources/images/${nested ? commentObj.nested_comments[0].vote === 0 || commentObj.nested_comments[0].vote === -1 ? hover.upvote ? "upvoteHover.png" : "upvote.png" : "upvoted.png" : commentObj.vote === 0 || commentObj.vote === -1 ?
                                                                                           hover.upvote ? "upvoteHover.png" : "upvote.png" 
                                                                                           : "upvoted.png"}`)} 
                        />
                    </button>
                    <h3 className="votes">{nested ? commentObj.nested_comments[0].upvotes : commentObj.upvotes}</h3>
                    <button className={nested ? `${index} nested` : `${index}`} onMouseEnter={handleHoverComment} onMouseLeave={handleHoverComment} onClick={handleLikeComment} id="downvote">
                        <img className="downvote" src={require(`../../resources/images/${nested ? commentObj.nested_comments[0].vote === 0 || commentObj.nested_comments[0].vote === 1 ? hover.downvote ? "downvoteHover.png" : "downvote.png" : "downvoted.png" : commentObj.vote === 0 || commentObj.vote === 1 ?
                                                                                            hover.downvote ? "downvoteHover.png" : "downvote.png"  
                                                                                            : "downvoted.png"}`)} 
                        />
                    </button>

                    {commentObj.nested_comments.length < 1 && <div className="reply comment-footer-box" id={`${index}`} onClick={handleNestedComment}>
                        <img className="reply-icon" src={require("../../resources/images/comments.png")} />
                        <h3>Reply</h3>
                    </div>}

                    <div className="comment-footer-box">
                        <h3>Give Award</h3>
                    </div>

                    <div className="comment-footer-box">
                        <h3>Share</h3>
                    </div>

                    <div className="comment-footer-box">
                        <h3>Report</h3>
                    </div>

                    <div className="comment-footer-box">
                        <h3>Save</h3>
                    </div>

                    <div className="comment-footer-box">
                        <h3>Follow</h3>
                    </div>
                </div>
            </div>
        </div>

        {commentObj.nesting === "edit" && 
            <div className="nestedComment">
                <div className="comment-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                <div className="comment-line second-row-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                <EditComment 
                  mainComment={mainComment}
                  index={index}
                  targetedComment={targetedComment}
                  writeComment={writeComment}
                  submitComment={submitComment}
                  currentSub={currentSub}
                  nested={true}
                  setIndex={setIndex}
                  writeNestedComment={writeNestedComment}
                  submitNestedComment={submitNestedComment}
                  currentEditedComment={currentEditedComment}
                  handleNestedComment={handleNestedComment}
                />
            </div>}

        {commentObj.nesting === "posted" && noFurtherNesting === undefined &&
            <div className="nestedComment">
                <div className="comment-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                <div className="comment-line second-row-line" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentSub!.buttonColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#edeff1"} style={{ backgroundColor: "#edeff1" }}></div>
                <PostedComment
                     index={index}
                     noFurtherNesting={true}
                     mainComment={mainComment}
                     currentPost={currentPost}
                     handleHoverComment={handleHoverComment}
                     handleLikeComment={handleLikeComment}
                     handleNestedComment={handleNestedComment}
                     hoveredComments={hoveredComments}
                     commentObj={commentObj}
                     targetedComment={currentPost.comments[index].nested_comments[0]}
                     writeComment={writeComment}
                     submitComment={submitComment}
                     currentSub={currentSub}
                     nested={true}
                     setIndex={setIndex}
                     writeNestedComment={writeNestedComment}
                     submitNestedComment={submitNestedComment}
                     currentEditedComment={currentEditedComment}
                />
            </div>
        }
    </div>
  );
}
