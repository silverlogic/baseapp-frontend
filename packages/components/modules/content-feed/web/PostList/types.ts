import {
  ContentPost_post$data,
  ContentPost_post$key,
} from '../../../../__generated__/ContentPost_post.graphql'

interface WithPost {
  post: ContentPost_post$data
}
export interface PostItemProps {
  postRef: ContentPost_post$key
}

export interface PostHeaderProps extends WithPost {}

export interface PostFooterProps extends WithPost {}
