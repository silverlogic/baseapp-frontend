import { ContentPostsFragment$data } from '../../../__generated__/ContentPostsFragment.graphql'

export type ContentPosts = NonNullable<ContentPostsFragment$data['contentPosts']>
export type ContentPostEdges = ContentPosts['edges']
export type ContentPostNode = NonNullable<ContentPostEdges[number]>['node']
