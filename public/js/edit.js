// two fetch calls
function updatePostHandler(event){
    event.preventDefault();
    console.log("update clicked")
}
async function deletePostHandler(event){
    event.preventDefault();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
    const url = `/api/posts/${post_id}`
    const response = await fetch(url, {
        method: "DELETE"
    })
    if (response.ok){
        alert("Post Deleted");
        document.location.replace('/dashboard');

    } else {
        alert(response.statusText)
    }

} 
// two document listeners
document.querySelector("#delete-post").addEventListener('click', deletePostHandler)
document.querySelector("#update-post").addEventListener('click', updatePostHandler)