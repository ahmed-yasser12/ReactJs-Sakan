/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FilterProducts } from '../../Context/FilterProducts';

export default function Message() {
    const { userData, setMessages, messages } = useContext(FilterProducts);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchMessages() {
        if (!userData?._id) return;

        setIsLoading(true);

        try {
            const { data } = await axios.get(
                `https://zunis-node-js.vercel.app/message/messageUser/${userData._id}`
            );

            setMessages(data.messages);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [userData]); // الصح

    return (
        <div className="container-message container">
            <section className="page-message messages">
                <h1 className="p-5">MESSAGE</h1>

                <div className="banner mx-md-4">

                    {isLoading ? (
                        <h3 className="p-5">Loading...</h3>

                    ) : messages?.length > 0 ? (

                        messages.map((element) => (
                            <div className="card" key={element._id}>
                                <div className="details">
                                    <p>
                                        From: <span>Admin</span>
                                    </p>
                                    <p>
                                        Contact: <span>01208073209</span>
                                    </p>
                                    <p>
                                        Message: <span>{element.body}</span>
                                    </p>
                                </div>
                            </div>
                        ))

                    ) : (
                        <h1 className="p-5">No Messages!</h1>
                    )}

                </div>
            </section>
        </div>
    );
}