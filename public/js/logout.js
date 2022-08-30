async function logoutBtnHandler(event) {
    event.preventDefault();
    
    const response = await fetch('/api/users/logout', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok){
        alert('You are now logged out!');
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector("#logout").addEventListener("click", logoutBtnHandler);