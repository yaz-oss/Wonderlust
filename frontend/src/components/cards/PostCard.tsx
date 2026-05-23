interface Post {
  id: string
  title: string
  description: string
  images: string[]
  user: {
    username: string
    name: string
    avatar?: string
  }
  likes: number
  comments: number
  createdAt: string
}

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-primary-bg-secondary backdrop-blur-md border border-primary-accent-cyan/20 rounded-2xl overflow-hidden shadow-glow hover:shadow-glow-cyan transition">
      {/* Author Info */}
      <div className="p-4 flex items-center gap-3 border-b border-primary-accent-cyan/10">
        {post.user.avatar && (
          <img 
            src={post.user.avatar} 
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <p className="font-semibold text-primary-text">{post.user.name}</p>
          <p className="text-sm text-primary-text-soft">@{post.user.username}</p>
        </div>
      </div>

      {/* Image */}
      {post.images.length > 0 && (
        <div className="w-full h-64 overflow-hidden bg-primary-bg">
          <img 
            src={post.images[0]} 
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary-text mb-2">{post.title}</h3>
        <p className="text-sm text-primary-text-soft mb-4 line-clamp-2">{post.description}</p>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-primary-accent-cyan/10">
          <button className="flex items-center gap-2 text-primary-text-soft hover:text-primary-accent transition">
            <span>♥</span>
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-primary-text-soft hover:text-primary-accent-cyan transition">
            <span>💬</span>
            <span className="text-sm">{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
