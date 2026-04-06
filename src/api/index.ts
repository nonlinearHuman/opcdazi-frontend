import type {
  ChannelTreeNode,
  ThreadList,
  ThreadDetail,
  Post,
  Subscription,
  CreateThreadRequest,
  CreatePostRequest,
  CreateSubscriptionRequest
} from '../types'

const API_BASE = '/api'

// 通用请求方法
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// 频道API
export const channelApi = {
  getChannels: () => request<ChannelTreeNode[]>('/channels'),
  getChannel: (id: number) => request<ChannelTreeNode>(`/channels/${id}`),
}

// 线程API
export const threadApi = {
  getThreads: (channelId?: number, skip = 0, limit = 20) => {
    const params = new URLSearchParams()
    if (channelId) params.append('channel_id', String(channelId))
    params.append('skip', String(skip))
    params.append('limit', String(limit))
    return request<ThreadList[]>(`/threads?${params}`)
  },
  
  getThread: (id: number) => request<ThreadDetail>(`/threads/${id}`),
  
  createThread: (data: CreateThreadRequest) =>
    request<ThreadDetail>('/threads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

// 回复API
export const postApi = {
  createPost: (data: CreatePostRequest) =>
    request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  acceptPost: (id: number) =>
    request<{ message: string }>(`/posts/${id}/accept`, {
      method: 'POST',
    }),
}

// 订阅API
export const subscriptionApi = {
  getSubscriptions: () => request<Subscription[]>('/subscriptions'),
  
  createSubscription: (data: CreateSubscriptionRequest) =>
    request<Subscription>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({ user_id: 1, ...data }),
    }),
    
  deleteSubscription: (id: number) =>
    request<{ message: string }>(`/subscriptions/${id}`, {
      method: 'DELETE',
    }),
}

// 声望值API
export const creditApi = {
  getCredit: (userId: number) => request<any>(`/credits/${userId}`),
  getHistory: (userId: number, limit = 20, offset = 0) => 
    request<any[]>(`/credits/${userId}/history?limit=${limit}&offset=${offset}`),
  getPrivileges: (userId: number) => request<any>(`/credits/${userId}/privileges`),
  getRules: () => request<any>('/credits/rules/overview'),
}

// AI问答API
export const aiApi = {
  chat: (message: string, channelId?: number, threadId?: number) =>
    request<any>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, channel_id: channelId, thread_id: threadId }),
    }),
  getStatus: () => request<any>('/ai/status'),
}
