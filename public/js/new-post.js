async function createNewPostHandler(event){
    event.preventDefault();
    // logic to create a new post
    // user id on req.session
    const title = document.querySelector("input[name='post-title']").value.trim();
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim(); 
    
    if(title && post_content){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_content
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok){
            document.location.replace('/dashboard'); 
        }
        else {
            alert(response.statusText)
        }
    } else {
        alert("please make sure all fields are completed")
    }
}
document.querySelector(".new-post-form").addEventListener('submit', createNewPostHandler);