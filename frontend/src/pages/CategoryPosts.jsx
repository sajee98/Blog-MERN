import { useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";



export default function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([null]);
  const {id} = useParams();

  const fetchPosts = async () => {
    const response = await axios.get(`http://localhost:3000/api/posts/category/${id}`);
    setPosts(response.data);
  }

  const fetchCategory = async () => {
    const response = await axios.get(`http://localhost:3000/api/categories/${id}`);
    setCategory(response.data);
  }

   

  // Simulating fetching posts from an API
  useEffect(() => {
    fetchPosts();
  fetchCategory();
  },[id])

    if (!category) {
    return <h3>Loading...</h3>;
  }
  return (
    <>


          <main>
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-8">
                    <h1 className="mb-4">{category.name}s</h1>

                  {
                            posts.length > 0 ? (
                                posts.map((post) => (<Post post={post} />))
                            ) : ( <h3> No post available</h3>)
                          }

                 

                </div>

               
            </div>
        </div>
    </main>

 
    </>
  );
}
