import {
  ContentPostsFragment$data,
  ContentPostsFragment$key,
} from '../../../../__generated__/ContentPostsFragment.graphql'

export interface ContentFeedProps {
  preloadedQuery: ContentPostsFragment$key
}

export type ContentPosts = NonNullable<ContentPostsFragment$data['contentPosts']>
export type ContentPostEdges = ContentPosts['edges']
export type ContentPostNode = NonNullable<ContentPostEdges[number]>['node']
