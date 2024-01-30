import { useState } from 'react'

import { Pokemon } from '@/shared/types'
import { capitalizeString, cn } from '@/shared/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

export default function PokemonCard ({
  pokemon
}: {
  pokemon: Pokemon
}): JSX.Element {
  const [imageBackLoaded, setImageBackLoaded] = useState(false)
  const [imageFrontLoaded, setImageFrontLoaded] = useState(false)

  return (
    <Card className='w-64 lg:w-80 flex flex-col items-center h-96' data-id={pokemon.id}>
      <CardHeader>
        <CardTitle>{capitalizeString(pokemon.name)}</CardTitle>
      </CardHeader>
      <CardContent className='h-full'>
        <Tabs
          defaultValue='front'
          className='w-60 h-full flex flex-col justify-between'
        >
          <TabsContent value='front'>
            {!imageFrontLoaded && <div className='w-52 lg:w-60 h-56' />}
            <img
              className={cn('w-full', imageFrontLoaded ? '' : 'hidden')}
              src={pokemon.frontSprite}
              alt={`${pokemon.name}'s front sprite`}
              onLoad={() => {
                setImageFrontLoaded(true)
              }}
            />
          </TabsContent>
          <TabsContent value='back'>
            {!imageBackLoaded && <div className='w-52 lg:w-60 h-60' />}
            <img
              className={cn('w-full', imageBackLoaded ? '' : 'hidden')}
              src={pokemon.backSprite}
              alt={`${pokemon.name}'s back sprite`}
              onLoad={() => {
                setImageBackLoaded(true)
              }}
            />
          </TabsContent>
          <TabsList className='text-xs grid w-full grid-cols-2'>
            <TabsTrigger value='front'>Front</TabsTrigger>
            <TabsTrigger value='back'>Back</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}
