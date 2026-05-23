import { create } from 'zustand'

interface Post {
  id: string
  title: string
  description: string
  images: string[]
  likes: number
  comments: number
}

interface PostStore {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  removePost: (id: string) => void
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  
  setPosts: (posts) => set({ posts }),
  
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  
  removePost: (id) => set((state) => ({
    posts: state.posts.filter(post => post.id !== id)
  }))
}))
