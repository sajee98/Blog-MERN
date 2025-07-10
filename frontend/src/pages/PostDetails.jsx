import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetails() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <div className="container my-4"><h3>Loading...</h3></div>;
    }

    //date
    const formattedDate = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(post.createdAt));

    return (
       <main className="container my-4">
        <div className="row">
            <article className="col-lg-8">
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-post-meta">{formattedDate} <a href="#">{post.author}</a></p>

                <img className="mb-3 img-fluid" src={post.image} alt="" />
                <div className="blog-post-content">
                    <p>{post.content}</p>
                </div>
            </article>

        </div>
    </main>
    );
}
