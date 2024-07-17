const Notification = ({ message }) => {
  console.log(message);
  return <p className={message.type}>{message.content}</p>;
};

export default Notification;
