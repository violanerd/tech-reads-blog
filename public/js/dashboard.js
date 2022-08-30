function newPostPageDirect(){
    document.location.replace('/dashboard/new'); 
}

document.querySelector("h1").innerHTML = `<a href='/Dashboard'>Dashboard</a>`;
document.querySelector("#new-post").addEventListener('click', newPostPageDirect);