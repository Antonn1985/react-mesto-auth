function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup__container-${name}`}>
                <button type="button" className={`popup__close link`} onClick={onClose} />
                <h3 className="popup__title">{title}</h3>
                <form
                    action="URL"
                    name={name}
                    className={`form form-${name}`}
                    noValidate=""
                    onSubmit={onSubmit}
                >
                    {children}

                    <button
                        type="submit"
                        className={`form__button form__button_type_${name} link`}
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;