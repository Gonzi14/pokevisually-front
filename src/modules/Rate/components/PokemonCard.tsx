import { Pokemon } from '@/shared/types'
import { capitalizeString } from '@/shared/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

export default function PokemonCard ({
  pokemon
}: {
  pokemon: Pokemon
}): JSX.Element {
  return (
    <Card className='w-64 lg:w-80 flex flex-col items-center h-96'>
      <CardHeader>
        <CardTitle>{capitalizeString(pokemon.name)}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='front' className='w-60'>
          <TabsList className='text-xs grid w-full grid-cols-2'>
            <TabsTrigger value='front'>Front</TabsTrigger>
            <TabsTrigger value='back'>Back</TabsTrigger>
          </TabsList>
          <TabsContent
            value='front'
            className='flex justify-center items-center'
          >
            <img
              className='w-full'
              src={pokemon.spriteFront}
              alt={`${pokemon.name}'s front sprite`}
            />
          </TabsContent>
          <TabsContent
            value='back'
            className='flex justify-center items-center'
          >
            <img
              className='w-full'
              src={pokemon.spriteBack}
              alt={`${pokemon.name}'s back sprite`}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
