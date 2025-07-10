import { useState } from 'react'
import './App.css'
import PostList from './pages/PostList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PostDetails from './pages/PostDetails'
import CategoryPosts from './pages/CategoryPosts'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {

  return (
    <div className="App">
      
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/posts/category/:id' element={<CategoryPosts />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  )
}

export default App
