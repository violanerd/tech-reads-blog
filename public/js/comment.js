async function commentSubmitHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

    if (comment_text){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {'Content-Type': 'application/json'}
        })
        console.log(response);
        if (response.ok){
            document.location.reload();
        }
        else {
            alert(response.statusText)
        }
    } else {
        alert("Please include a comment!" + response.statusText)
    }
}

document.querySelector(".comment-form").addEventListener('submit', commentSubmitHandler)