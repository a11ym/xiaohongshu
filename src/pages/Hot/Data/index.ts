
export type VideoData = {
  id: string;
  uri: string;
  title: string;
  username: string;
  avatar: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
  hashtags: string[];
}

const videoData: VideoData[] = [
  {
    id: '1',
    uri: require('../../../assets/video/1.mp4'),
    title: '城市霓虹下的舞蹈',
    username: '舞蹈达人小美',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    likes: 12500,
    comments: 320,
    shares: 150,
    music: '流行音乐 - 节奏感十足',
    hashtags: ['#舞蹈', '#城市夜景', '#时尚']
  },
  {
    id: '2',
    uri: require('../../../assets/video/2.mp4'),
    title: '深夜吉他弹唱',
    username: '音乐人小李',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    likes: 8900,
    comments: 210,
    shares: 98,
    music: '原创音乐 - 深夜思绪',
    hashtags: ['#吉他', '#原创', '#音乐人']
  },
  {
    id: '3',
    uri: require('../../../assets/video/3.mp4'),
    title: '深夜吉他弹唱',
    username: '音乐人小李',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    likes: 8900,
    comments: 210,
    shares: 98,
    music: '原创音乐 - 深夜思绪',
    hashtags: ['#吉他', '#原创', '#音乐人']
  },
  {
    id: '4',
    uri: require('../../../assets/video/4.mp4'),
    title: '城市霓虹下的舞蹈',
    username: '舞蹈达人小美',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    likes: 12500,
    comments: 320,
    shares: 150,
    music: '流行音乐 - 节奏感十足',
    hashtags: ['#舞蹈', '#城市夜景', '#时尚']
  },
  {
    id: '5',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-tricks-with-skateboard-in-a-parking-lot-34557-large.mp4',
    title: '滑板公园技巧秀',
    username: '滑板小子',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    likes: 18700,
    comments: 430,
    shares: 210,
    music: '嘻哈音乐 - 动感节奏',
    hashtags: ['#滑板', '#极限运动', '#街头文化']
  }
];

export default videoData