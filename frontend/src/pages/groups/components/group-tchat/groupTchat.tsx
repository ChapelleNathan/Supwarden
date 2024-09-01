import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"
import { LightGroupDTO } from "../../../../model/GroupModels"
import axios from "axios";
import ServiceResponse from "../../../../model/ServiceResponse";
import { CreateMessageDto, MessageDto } from "../../../../model/MessageModels";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Form } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useToast } from "../../../../context/ToastContext";
import { Send } from "react-bootstrap-icons";
import './groupTchat.scss';

interface GroupTchatProps {
    selectedGroup: LightGroupDTO
}

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}
export default function GroupTchat({ selectedGroup }: GroupTchatProps) {
    const [connection, setConnection] = useState<HubConnection>();
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [message, setMessage] = useState('');
    const { addToast } = useToast();
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const hasInitilized = useRef(false);

    useEffect(() => {
        if (hasInitilized.current) return;

        hasInitilized.current = true;

        const fetchMessages = async () => {
            const serviceResponse = (await axios.get(`http://localhost:8080/message/group/${selectedGroup.id}`, config)).data as ServiceResponse;
            setMessages(serviceResponse.data as MessageDto[])
        };


        const inizializeConnection = async () => {
            if (connection) return;

            console.log('connecting...');

            const newConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:8080/api/chat")
                .configureLogging(LogLevel.Information)
                .build();

            newConnection.on('JoinedRoom', (username: string, msg: string) => {
                console.log(`${username} connected: ${msg}`);
            })

            newConnection.on('ReceivedMessage', (messageDto: MessageDto) => {
                console.log('receivedMessage triggerd');
                setMessages(prevMessages => [...prevMessages, messageDto]);
            })

            try {
                await newConnection.start()
                await newConnection.invoke('JoinChatRoom', {
                    username: localStorage.getItem('email'),
                    chatroom: selectedGroup.id,
                    userId: localStorage.getItem('id')
                });
                setConnection(newConnection);
                console.log('connected !');
            } catch (error) {
                console.error(error);
            }
        }

        if (selectedGroup) {
            fetchMessages();
            inizializeConnection();
        }

        return () => {
            if (connection) {
                connection.stop().then(() => {
                    console.log('connection stopped');
                }).catch(err => {
                    console.error(err);
                })
            }
        }
    }, [])

    const onSubmitMessage = async (event: FormEvent) => {
        event.preventDefault();
        if (message == '') {
            addToast('Vous ne pouvez pas envoyer un message vide', {
                bg: 'danger',
                autohide: true,
                delay: 3000
            });
            return;
        }
        const createMessageDto: CreateMessageDto = {
            userId: localStorage.getItem('id')!,
            groupId: selectedGroup.id,
            text: message
        }

        try {
            const serviceResponse = (await axios.post(`http://localhost:8080/message`, createMessageDto, config)).data as ServiceResponse;
            const messageDto = serviceResponse.data as MessageDto;
            await connection?.invoke("SendMessage", messageDto)
            setMessage('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serviceResponse = error.response?.data as ServiceResponse;
                addToast(serviceResponse.message, {
                    bg: 'danger',
                    delay: 3000,
                    autohide: true
                })
            }
        }
    }

    const displayMessages = (): ReactNode => {
        return messages.map(message => (
            <div
                key={message.id}
                className={
                    (message.username === localStorage.getItem('email') ? 'bg-primary rounded-top rounded-start color-primary text-light align-self-end' : ' rounded-top rounded-end')
                    + ' message border py-1 px-2'
                }
            >
                <p className="username">{message.username === localStorage.getItem('email') ? 'Vous' : message.username}</p>
                <p>{message.text}</p>
            </div>
        ))
    }

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className="chat d-flex flex-column flex-fill overflow-hidden">
            <div className="messages d-flex flex-column gap-3 flex-fill overflow-y-scroll">
                {displayMessages()}
                <div ref={messageEndRef}></div>
            </div>
            <Form onSubmit={onSubmitMessage} className="mt-3">
                <InputGroup>
                    <FormControl rows={1} id="message-text" as='textarea' value={message} onChange={(e) => setMessage(e.target.value)} />
                    <Button type="submit"><Send /></Button>
                </InputGroup>
            </Form>
        </div>
    )
}