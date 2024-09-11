import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authentication/login')({
  component: () => <div>Hello /authentication/login!</div>
})