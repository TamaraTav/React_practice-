import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

function Post() {
    const [post,setPost] = useState({})
    let { id } = useParams()

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(json => setPost(json))
    },[])

    return(
        <div className="post-page">
            <h1>{post.title} </h1>
            <p>{post.body} </p>
        </div>
    );
}

export default Post;