import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/user/cart')({
  component: () => <div>Hello /user/cart!</div>
})