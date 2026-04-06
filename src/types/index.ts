// 频道类型
export interface Channel {
  id: number
  name: string
  type: 'region' | 'topic' | 'lead'
  parent_id: number | null
  description: string | null
  icon: string | null
  sort_order: number
  created_at: string
}

export interface ChannelTreeNode extends Channel {
  children: ChannelTreeNode[]
  thread_count: number
  is_subscribed: boolean
  has_unread: boolean
}

// 线程类型
export interface Thread {
  id: number
  channel_id: number
  title: string
  content: string
  author_id: number | null
  author_name: string | null
  type: 'question' | 'guide' | 'resource' | 'lead'
  view_count: number
  reply_count: number
  is_pinned: boolean
  created_at: string
  updated_at: string | null
}

export interface ThreadList extends Thread {
  channel_name: string | null
}

export interface ThreadDetail extends Thread {
  posts: Post[]
}

// 回复类型
export interface Post {
  id: number
  thread_id: number
  content: string
  author_id: number | null
  author_name: string | null
  is_answer: boolean
  created_at: string
}

// 订阅类型
export interface Subscription {
  id: number
  user_id: number
  subscribable_type: 'channel' | 'thread'
  subscribable_id: number
  notify_level: 'all' | 'mention' | 'none'
  created_at: string
}

// 创建请求类型
export interface CreateThreadRequest {
  channel_id: number
  title: string
  content: string
  author_name: string
  type?: string
}

export interface CreatePostRequest {
  thread_id: number
  content: string
  author_name: string
}

export interface CreateSubscriptionRequest {
  subscribable_type: 'channel' | 'thread'
  subscribable_id: number
  notify_level?: string
  user_id?: number
}

// 声望值类型
export interface CreditScore {
  user_id: number
  score: number
  level: number
  level_name: string
  total_earned: number
  total_spent: number
  updated_at: string
}

export interface CreditHistory {
  id: number
  user_id: number
  change: number
  reason: string
  ref_type: string | null
  ref_id: number | null
  balance_after: number
  created_at: string
}

export interface UserPrivileges {
  level: number
  level_name: string
  score: number
  privileges: {
    name: string
    can_post: boolean
    can_reply: boolean
    can_like: boolean
    can_collect: boolean
    priority?: boolean
    free_ai?: boolean
  }
}
