import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Cookies from 'universal-cookie';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';
import ChatInvite from '../components/ChatInvite';
import { GruupChatTypes as TYPES } from '../middleware/types';
import { CHATBASE as API_BASE_URL } from '../middleware/Constants';
import '../css/GruupChat.css';
import { group } from '../middleware/IconsStore';

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currGroup, setCurrGroup] = useState('');

  const latestChatMessages = useRef([]);

  const cookies = new Cookies();

  const hubUrl = API_BASE_URL + 'gruupmessenger';

  latestChatMessages.current = chatMessages;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [hubUrl]);

  useEffect(() => {
    if (!connection) return;

    async function startConnection() {
      try {
        if (connection.state === 'Disconnected') {
          await connection.start({ withCredentials: false });
          console.log(TYPES.CONNECTION_ESTABLISHED);

          connection.on(TYPES.RECEIVE_CONNECTION_ID, (connectionId) => {
            cookies.set(TYPES.CONNECTION_ID, connectionId);
            const groupRequestPayload = {
              conId: connectionId,
              userName: '',
              token: cookies.get('token'),
            };
            connection.invoke(
              TYPES.RETRIEVE_USER_GROUPS,
              JSON.stringify(groupRequestPayload)
            );
          });

          connection.on(TYPES.RETRIEVE_USER_GROUPS, (groups) => {
            groups.forEach((group) => {
              localStorage.setItem(group.groupName, JSON.stringify(group));
            });
          });

          connection.on(TYPES.INVITE_USER_SUCCESSFUL, (message) => {
            console.log(message);
          });

          connection.on(TYPES.RETURN_EXCEPTION, (exception) => {
            console.log(exception);
          });

          connection.on(TYPES.RECEIVE_MESSAGE, (message) => {
            const updatedChatMessages = [...latestChatMessages.current];
            updatedChatMessages.push(JSON.parse(message));
            setChatMessages(updatedChatMessages);
          });
        }
      } catch (e) {
        console.error(TYPES.CONNECTION_FAILED, e.message);
      }
    }

    startConnection();

    return () => {
      if (connection && connection.state !== 'Disconnected') {

      } else {
        console.log(connection);
      }
    };
  }, [connection, cookies, hubUrl]);

  const loadConversation = (groupId) => {
    // Retrieve messages from localStorage for the selected conversation
    const storedMessages = groupId;
    const retrievedMessages = storedMessages ? storedMessages.conversation : [];


    //need to sort the messages here by datetime
    
    setChatMessages(retrievedMessages);

    // Update the recipients with the current conversation's participants
    const conversation = storedMessages;
    setRecipients(conversation.groupName.split(','));
    setSelectedConversation(groupId);
    setCurrGroup(conversation.groupUID);
  };

  const startNewConversation = () => {
    // Clear the chat messages and recipients for a new conversation
    setChatMessages([]);
    setRecipients([]);
  
    // Create an empty chat group
    const emptyGroup = {
      groupName: '',
      conversation: [],
    };
  
    // Set the empty chat group as the selected conversation
    setSelectedConversation(emptyGroup);
  };
  

  const sendMessage = async (groupId, message, toUser) => {
    console.log(currGroup);

    if (!connection) return;
    try {
      const messagePayload = {
        conId: cookies.get(TYPES.CONNECTION_ID),
        token: cookies.get('token'),
        groupId: currGroup,
        message: message,
      };
      await connection.invoke(
        TYPES.SEND_PRIVATE_MESSAGE,
        JSON.stringify(messagePayload)
      );
    } catch (e) {
      console.error(TYPES.SEND_MESSAGE_FAILED, e.message);
    }
  };

  const inviteUser = async (groupName, userEmail) => {
    if (!connection) return;

    try {
      const invitePayload = {
        groupName: groupName,
        userEmail: userEmail,
        sender: '',
      };
      await connection.invoke(
        TYPES.INVITE_USER,
        JSON.stringify(invitePayload)
      );
    } catch (e) {
      console.error(TYPES.INVITE_USER_FAILED, e.message);
    }
  };

  return (
    <div>
      <div>
        <h3>Conversations:</h3>
        <ul>
          {localStorage.length > 0 &&
            Object.entries(localStorage).map(([groupName, groupId]) => (
              <li key={groupId}>
                <button onClick={() => loadConversation(JSON.parse(groupId))}>
                  {groupName}
                </button>
              </li>
            ))}
        </ul>
        <button onClick={startNewConversation}>Start New Chat</button>
      </div>
      <div>
        <ChatBox chatMessages={chatMessages} />
        {selectedConversation && ( // Conditionally render ChatInput when selectedConversation is not null
          <ChatInput recipients={recipients} sendMessage={sendMessage} groupUID={currGroup}/>
        )}
      </div>
      <ChatInvite inviteUser={inviteUser} />
    </div>
  );
};

export default Chat;
