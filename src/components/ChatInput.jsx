import React, { useState, useEffect } from 'react';

const ChatInput = (props) => {
  const [groupId, setGroupId] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    // Set the initial value of recipients to props.recipients when the component is loaded
    setRecipients(props.recipients);
  }, [props.recipients]);

  const onSubmit = (e) => {
    e.preventDefault();

    const isRecipientsProvided = recipients.length > 0;
    const isMessageProvided = message !== '';

    if (isRecipientsProvided && isMessageProvided) {
      const groupMembers = recipients.slice(); // Create a copy of the recipients array

      const formedMessage = {
        Username: '',
        Body: message,
        GroupRecipients: recipients,
      };

      props.sendMessage('', formedMessage, groupMembers);
      setMessage(''); // Clear the message input field
    } else {
      alert('Please select a recipient and enter a message.');
    }
  };

  const onRecipientUpdate = (e) => {
    setRecipient(e.target.value);
  };

  const onAddRecipient = () => {
    if (recipient !== '' && !recipients.includes(recipient)) {
      setRecipients([...recipients, recipient]); // Add the recipient to the array
      setRecipient(''); // Clear the input field
    }
  };

  const onRemoveRecipient = (removedRecipient) => {
    const updatedRecipients = recipients.filter((recipient) => recipient !== removedRecipient);
    setRecipients(updatedRecipients);
  };

  const onMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form className="chat-input" onSubmit={onSubmit}>
      <label htmlFor="user">User:</label>
      <br />
      <input
        id="user"
        name="user"
        value={recipient}
        onChange={onRecipientUpdate}
      />
      <button type="button" onClick={onAddRecipient}>Add Recipient</button>
      <br />
      <label htmlFor="message">Message:</label>
      <br />
      <input
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={onMessageUpdate}
      />
      <br /><br />
      <button>Submit</button>

      {recipients.length > 0 && (
        <div>
          <h4>Recipients:</h4>
          <ul>
            {recipients.map((recipient) => (
              <li key={recipient}>
                {recipient}
                <button type="button" onClick={() => onRemoveRecipient(recipient)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default ChatInput;
