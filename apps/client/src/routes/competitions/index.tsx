import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/competitions/')({
  component: () => <div>Hello /competitions/!</div>,
})
