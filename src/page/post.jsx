import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Post() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/posts");
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!post.title) {
    return <div className="not-found">Post not found</div>;
  }

  return (
    <div className="post-page">
      <button className="back-button" onClick={handleBack}>
        ← Back to Posts
      </button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

export default Post;
