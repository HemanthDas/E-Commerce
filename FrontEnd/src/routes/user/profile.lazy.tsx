import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/profile')({
  component: () => <div>Hello /user/profile!</div>
})