import React from "react";

function Login(){
    console.log('login.jsx loaded')


    return(
        <div className="container">
            <div className="form-group">
                 <label for="username"> Username: </label>
                 <input required type="text" name = "username" id="username" className="form-control"/>
             </div>

             <div className="form-group">
                 <label for="password"> Password: </label>
                 <input required type="password" name = "password" id="password" className="form-control"/>
             </div>

             <button type="submit" onClick={() => test()} className="btn btn-primary"> Log In </button>

        </div>
    // <div class="container" id="loginform">
    //     <form action="http://localhost:3001/login" method="POST">
    //         <div class="form-group">
    //             <label for="username"> Username: </label>
    //             <input required type="text" name = "username" id="username" class="form-control"/>
    //         </div>
            
    //         <div class="form-group">
    //             <label for="password"> Password: </label>
    //             <input required type="password" name = "password" id="password" class="form-control"/>
    //         </div>
    
    //         <a href="/data/registerForm" class="btn btn-secondary"> Register </a>
    //         <button type="submit" class="btn btn-primary"> Log In </button>
    //     </form>
    //     {/* add in the danger text */}
    // </div>

    );
}

function test(body) {
    let username = document.getElementById("username").value;
    console.log(username);

    let password = document.getElementById("password").value;
    console.log(password);

    //let {username, password} = body;
    fetch("http://localhost:3001/login", {
        method: "POST",
        redirect: 'follow',
        body: JSON.stringify({
            username: username,
            password: password
        })

    }).then(response=> {
        console.log("This is the response returned:")
        console.log(response)
        //redirects according to response of the fetch request
        window.location.href = response.url;
        
    }).catch(function(err) {
        console.log(err)
    })
}

export default Login;