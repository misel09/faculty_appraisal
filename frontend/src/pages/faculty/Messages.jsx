import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Button,
  Divider,
  Badge,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import axios from 'axios';
import './Messages.css';

const Messages = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/faculty/messages/conversations');
      setConversations(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch conversations');
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(`/api/faculty/messages/${conversationId}`);
      setMessages(response.data);
    } catch (err) {
      setError('Failed to fetch messages');
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const response = await axios.post(
        `/api/faculty/messages/${selectedConversation._id}`,
        { content: newMessage }
      );
      setMessages((prev) => [...prev, response.data]);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleMenuClick = (event, message) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessage(message);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleDeleteMessage = async (message) => {
    try {
      await axios.delete(`/api/faculty/messages/${message._id}`);
      setMessages((prev) => prev.filter((m) => m._id !== message._id));
    } catch (err) {
      setError('Failed to delete message');
    }
  };

  const handleArchiveConversation = async (conversation) => {
    try {
      await axios.put(`/api/faculty/messages/conversations/${conversation._id}/archive`);
      setConversations((prev) =>
        prev.map((c) =>
          c._id === conversation._id ? { ...c, archived: true } : c
        )
      );
    } catch (err) {
      setError('Failed to archive conversation');
    }
  };

  const handleStarConversation = async (conversation) => {
    try {
      await axios.put(`/api/faculty/messages/conversations/${conversation._id}/star`);
      setConversations((prev) =>
        prev.map((c) =>
          c._id === conversation._id ? { ...c, starred: !c.starred } : c
        )
      );
    } catch (err) {
      setError('Failed to update conversation');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.participants.some((participant) =>
      participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box className="messages-container">
      <Typography variant="h4" className="page-title">
        Messages
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Conversations List */}
        <Grid item xs={12} md={4}>
          <Paper className="conversations-section">
            <Box className="section-header">
              <Typography variant="h6" className="section-title">
                Conversations
              </Typography>
              <TextField
                size="small"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <List>
              {filteredConversations.map((conversation) => (
                <ListItem
                  key={conversation._id}
                  button
                  selected={selectedConversation?._id === conversation._id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`conversation-item ${
                    !conversation.read ? 'unread' : ''
                  }`}
                >
                  <ListItemAvatar>
                    <Badge
                      color="error"
                      variant="dot"
                      invisible={conversation.read}
                    >
                      <Avatar src={conversation.avatar}>
                        {conversation.name[0]}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conversation.name}
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                      >
                        {conversation.lastMessage}
                      </Typography>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStarConversation(conversation);
                    }}
                  >
                    {conversation.starred ? (
                      <StarIcon color="primary" />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Messages Section */}
        <Grid item xs={12} md={8}>
          {selectedConversation ? (
            <Paper className="messages-section">
              <Box className="section-header">
                <Box className="conversation-info">
                  <Avatar
                    src={selectedConversation.avatar}
                    className="conversation-avatar"
                  />
                  <Typography variant="h6">
                    {selectedConversation.name}
                  </Typography>
                </Box>
                <Box className="conversation-actions">
                  <IconButton>
                    <PersonAddIcon />
                  </IconButton>
                  <IconButton>
                    <GroupIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      handleArchiveConversation(selectedConversation)
                    }
                  >
                    <ArchiveIcon />
                  </IconButton>
                </Box>
              </Box>

              <Divider />

              <Box className="messages-list">
                {messages.map((message) => (
                  <Box
                    key={message._id}
                    className={`message-item ${
                      message.sender === 'me' ? 'sent' : 'received'
                    }`}
                  >
                    <Box className="message-content">
                      <Typography variant="body1">
                        {message.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, message)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              <Divider />

              <Box className="message-input">
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <IconButton>
                  <EmojiEmotionsIcon />
                </IconButton>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          ) : (
            <Paper className="messages-section empty-state">
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedMessage && (
          <MenuItem
            onClick={() => {
              handleDeleteMessage(selectedMessage);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete Message
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default Messages; 