export type Data = {
  id: number;
  name: string;
  title: string;
  content: string;
  image_url: string;
  avatar: string;
  like: number;
}

const data: Data[] = Array.from({ length: 100 }, (_, i) =>
({
  id: i,
  name: `name${i + 1}`,
  title: `Item：${i}${Math.random().toString(36).substring(7) + Math.random().toString(36)}`,
  content: `Content ${i + 1}`,
  image_url: `https://picsum.photos/200/300?random=${i}`,
  avatar: `https://picsum.photos/100/100`,
  like: Math.floor(Math.random() * 1000) + 1,
})
);

export default data