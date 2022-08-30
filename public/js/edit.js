
async function updatePostHandler(event){
    event.preventDefault();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
    const title= document.querySelector("input[name='post-title']").value.trim();
    if(title && post_content){
        const response = await fetch(`/api/posts/${post_id}`,{
            method: 'PUT',
            body: JSON.stringify({
                title,
                post_content
            }),
            headers: {'Content-Type': 'application/json'}
        })
        console.log(response);
        if (response.ok) {// make this look like lower one
            alert("Post Updated");
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    } else {
        alert("Please make sure all fields are completed")
    }
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
document.querySelector("#delete-post").addEventListener('click', deletePostHandler)
document.querySelector("#update-post").addEventListener('click', updatePostHandler)