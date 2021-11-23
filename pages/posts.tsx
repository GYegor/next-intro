import {useEffect, useState} from 'react';
import {NextPage, NextPageContext} from 'next';
import {useRouter} from "next/router";
import Link from "next/link";

import {MainLayout} from "../layouts/MainLayout";
import {MyPost} from "../interfaces/post";

interface PostsProps {
  posts: MyPost[];
}

const useUser = () => ({ user: 'Me', loading: false });

const Posts: NextPage<PostsProps> = ({ posts: serverPosts }) => {
  const [posts, setPosts] = useState(serverPosts);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${process.env.BASE_API_URL}/posts`)
      const data = await res.json();
      setPosts(data);
      }
    
    if (!serverPosts) {
      load();
    }
  }, []);

  if (!posts) {
    return (
      <MainLayout title={`Posts`}>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Posts">
      <h1>Posts page</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={'post/[pid]'} as={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/about', )}>Help</button>
    </MainLayout>
  )
};

Posts.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) { // means we already on front and has no req
    return { posts: null };
  }
  const res = await fetch(`${process.env.BASE_API_URL}/posts`);
  const posts = await res.json();
  return { posts };
}

export default Posts;
