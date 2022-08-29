function newPostPageDirect(){
    document.location.replace('/dashboard/new'); 
}

document.querySelector("#new-post").addEventListener('click', newPostPageDirect);