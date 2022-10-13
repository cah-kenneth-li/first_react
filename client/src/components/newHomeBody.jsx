import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import styles from './imageStyle.module.css'
import background from './../nature.jpg'


export default function NewHomeHeader(){

    
    return(
        <article className={styles.article}>
        <picture className={styles.picture}>
            <source media="(min-width: 0px)" srcSet={background} />
            <img src={background} alt="background"/>
        </picture>
        <h1 className={styles.header}>Just me</h1>
        </article>
    )
}