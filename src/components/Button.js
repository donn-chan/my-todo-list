import React from 'react';

const Button = ({buttonClass, onButtonClick, content}) => {
    return(
        <button className={buttonClass} onClick={ onButtonClick }>
            {content}
        </button>
    );
}

export default Button;