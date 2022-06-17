import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function Register(){

    return(
        <div class="container">
    <form action="/data/register" method="POST">
        <div class="form-group">
            <label for="username"> Username: </label>
            <input required value="<%= locals.username%>" type="text" name = "username" id="username" class="form-control"/>
        </div>
        
        <div class="form-group">
            <label for="password"> Password: </label>
            <input required type="text" name = "password" id="password" class="form-control"/>
        </div>

        <a href="/" class="btn btn-secondary"> Cancel </a>
        <button type="submit" class="btn btn-primary"> Register </button>
    </form>

</div>
    )
}
