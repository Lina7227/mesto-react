import React from 'react';

function PopupWithForm({name, content, isOpen, close, namef, form, title, children, button, subtitle, onClose, onSubmit, buttonSbmText}) {
    return (     

        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>

            <div className={`popup__content popup__content_${content}`}>
                
                <button type="button" aria-label="закрыть попап" className={`popup__close popup__close_form popup__close_${close}`} onClick={onClose}></button>
                
                <form name={`${namef}`} className={`form form_${form}`}noValidate onSubmit={onSubmit}>
                    <h2 className="form__title">{title}</h2>

                    {children}

                    <fieldset className="form__handler">
                        <button 
                            type="submit" 
                            className={`form__button form__button_${button}`}>{buttonSbmText}
                        </button>
                    </fieldset>

                </form>
                
            </div>

        </div>

    );
}

export default PopupWithForm;

