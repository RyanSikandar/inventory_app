import React from 'react'
import "./Contact.scss"
import Card from '../../components/Card/Card'
import { useState } from 'react'
const Contact = () => {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div className='contact'>
            <h3 className='--mt'>Contact Us</h3>
            <div className='section '>
                <form>
                    <Card cardClass={"card"}>
                        <label>Subject</label>
                        <input type='text' />
                        <label>Message</label>
                        <textarea rows={"10"} cols={"30"} />
                        <button className='--btn --btn-primary'>
                            Send Message
                        </button>

                    </Card>
                </form>


            </div>
        </div>
    )
}

export default Contact