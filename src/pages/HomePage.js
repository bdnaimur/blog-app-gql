import MyBlogPage from "../components/blogs/MyBlogs"
import Header from "../components/header/Header"

const HomePage = () =>{
    console.log("home page called");

    return(

        <>
        <Header/>
        <MyBlogPage/>
        </>
    )
}
export default HomePage