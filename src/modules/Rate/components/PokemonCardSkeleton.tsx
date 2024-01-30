import { Skeleton } from '@/shared/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/shared/ui/card'

export default function PokemonCardSkeleton (): JSX.Element {
  return (
    <Card className='w-64 lg:w-80 flex flex-col items-center h-96'>
      <CardHeader>
        <Skeleton className='w-32 h-6' />
      </CardHeader>
      <CardContent className='w-60 h-full flex flex-col justify-between items-center'>
        <Skeleton className='w-52 lg:w-60 h-56' />
        <Skeleton className='mt-6 w-52 lg:w-60 h-10' />
      </CardContent>
    </Card>
  )
}
