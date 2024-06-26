import { useState } from "react";
import courierTest from "../utils/courierForm";

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [nonFunction, setNonFunction] = useState('');

    const nameRegex = /^[A-Za-z0-9]+$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const titleRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(\;+=._\s]{1,40}$/;
    const messageRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(\;+=._\s]+$/;


    // handles react updating for the inputs
    const handleInputChange = (element) => {
        const {target} = element;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'name'){
            setName(inputValue);
        } else if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'title') {
            setTitle(inputValue);
        } else if (inputType === 'message') {
            setMessage(inputValue);
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        courierTest(title, message, name, email);
        // setNonFunction('Unfortunately, this form does not function independently. However, I do have a button that will open an email in another tab.\n I look forward to speaking with you.');

        setName('');
        setEmail('');
        setTitle('');
        setMessage('');
    }

    const errorCheck = (e) =>{
        if(e){
            return true
        } else {
            return false
        }
    }

    return (
        <main className="block mx-6 pb-2 mb-6">
            <h2 className="subtitle is-2 block">
                Contact Me
            </h2>
            <form className="box field" onSubmit={submitHandler}>
                <p className="label">Name:</p>
                <input className="input"
                    required
                    value={name}
                    name="name"
                    type="text"
                    placeholder="Your name"
                    onChange={handleInputChange}
                    onBlur={() => {
                        if (name === '' || /\s+/.test(String(name))) {
                            setError('Please enter a name, blank space is not counted.');
                        } else if (!nameRegex.test(String(name))){
                            setError('Please Ensure the name is Alpha-Numeric (no special Characters).');
                        } else {
                            setError('');
                        }
                    }}
                />
            
                <p className="label pt-1">Email:</p>
                <input className="input"
                    required
                    value={email}
                    name="email"
                    type="email"
                    placeholder="Your email"
                    onChange={handleInputChange}
                    onBlur={() => {
                        if (email === '' || /^\s+[\s]$/.test(String(email))) {
                            setError('Please enter an email, blank space is not counted.');
                        } else if (!emailRegex.test(String(email))) {
                            setError('Please enter a valid email address (E.g. test@gmail.com).');
                        } else {
                            setError('');
                        }
                    }}
                />

                <p className="label pt-1">Title:</p>
                <input className="input"
                    required
                    value={title}
                    name="title"
                    type="title"
                    placeholder="Title of your email"
                    onChange={handleInputChange}
                    onBlur={() => {
                        if (title === '' || /^\s+[\s]$/.test(String(title))) {
                            setError('Please enter a title, blank space is not counted.');
                        } else if (!titleRegex.test(String(title))) {
                            setError('Please keep the title simple and between 1 and 40 characters long');
                        } else {
                            setError('');
                        }
                    }}
                />

                <p className="label pt-1">Message: </p>
                <textarea className="textarea"
                    required
                    value={message}
                    name="message"
                    type="textarea"
                    placeholder="The body of your message to me"
                    rows={10}
                    onChange={handleInputChange}
                    onBlur={() => {
                        if (message === '' || /^\s+[\s]$/.test(String(message))) {
                            setError('Please enter a message, blank space is not counted.');
                        } else if (!messageRegex.test(String(message))) {
                            setError('Something went wrong. Try to avoid complex characters or emojis/emoticons in the message please.');
                        } else {
                            setError('');
                        }
                    }}
                />
                {error && <div className="notification is-warning mt-2">{error}</div>}
                {nonFunction && <div className="columns notification is-info mt-2">
                    <p className="column is-11">{nonFunction}</p>
                    <div className="column is-1">
                        <a className="button is-link py-3" target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ianmstevenson1@gmail.com">Email</a>
                    </div>
                    </div>}

                <button className="button is-primary field mt-2" type="submit" disabled={errorCheck(error)}>Submit</button>
            </form>
        </main>
    );
}