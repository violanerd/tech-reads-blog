async function loginFormHandler(event){
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username, password);

    if (username && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok){
            document.location.replace('/'); // change to dashboard
        } else {
            alert(response.statusText);
        }
    }

}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
