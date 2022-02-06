import React from 'react';

export default function Die(props) {

    const styles = {
        backgroundColor: props.isheld ? "wheat" : "white" 
    }

    return (
        <div className="container" style = {styles} onClick = {props.onClick}>
            <h2>{props.value}</h2>
        </div>
    )
}