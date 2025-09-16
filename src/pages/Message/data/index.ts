export type MessageItem = {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  isRead: boolean;
  avatar: string;
}
const data = [
  {
    "id": 1,
    "title": "John Doe",
    "content": "Hello, how are you?",
    "date": "2022-01-01T12:00:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 2,
    "title": "Jane Doe",
    "content": "I'm good, thanks!",
    "date": "2022-01-01T12:05:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 3,
    "title": "John Doe",
    "content": "What have you been up to?",
    "date": "2022-01-01T12:10:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 4,
    "title": "Jane Doe",
    "content": "Not much, just working on a project.",
    "date": "2022-01-01T12:15:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 5,
    "title": "John Doe",
    "content": "That sounds interesting. Can I take a look?",
    "date": "2022-01-01T12:20:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 6,
    "title": "Jane Doe",
    "content": "Sure, here's the link.",
    "date": "2022-01-01T12:25:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 7,
    "title": "John Doe",
    "content": "Thanks! It looks great.",
    "date": "2022-01-01T12:30:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 8,
    "title": "Jane Doe",
    "content": "I'm glad you like it.",
    "date": "2022-01-01T12:35:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 9,
    "title": "John Doe",
    "content": "Let's meet up later to discuss it in more detail.",
    "date": "2022-01-01T12:40:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 10,
    "title": "Jane Doe",
    "content": "Sounds good. I'll see you then.",
    "date": "2022-01-01T12:45:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 11,
    "title": "John Doe",
    "content": "Bye!",
    "date": "2022-01-01T12:50:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 12,
    "title": "Jane Doe",
    "content": "Goodbye!",
    "date": "2022-01-01T12:55:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 13,
    "title": "John Doe",
    "content": "How was your day?",
    "date": "2022-01-01T13:00:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 14,
    "title": "Jane Doe",
    "content": "It was good, thanks!",
    "date": "2022-01-01T13:05:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 15,
    "title": "John Doe",
    "content": "What did you do today?",
    "date": "2022-01-01T13:10:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 16,
    "title": "Jane Doe",
    "content": "I went to the gym and then had lunch with some friends.",
    "date": "2022-01-01T13:15:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 17,
    "title": "John Doe",
    "content": "That sounds fun. Did you eat anything good?",
    "date": "2022-01-01T13:20:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 18,
    "title": "Jane Doe",
    "content": "Yes, I had a delicious pizza.",
    "date": "2022-01-01T13:25:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 19,
    "title": "John Doe",
    "content": "That sounds delicious. I should try it sometime.",
    "date": "2022-01-01T13:30:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 20,
    "title": "Jane Doe",
    "content": "You should definitely try it. It's one of my favorites.",
    "date": "2022-01-01T13:35:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  },
  {
    "id": 21,
    "title": "John Doe",
    "content": "I agree. I'll definitely try it.",
    "date": "2022-01-01T13:40:00Z",
    "image": "https://example.com/avatar.jpg",
    "isRead": true,
    "avatar": "https://picsum.photos/100/100"
  }
];
export default data;