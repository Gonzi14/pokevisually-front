import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@ui/select'
import { cn } from '@shared/utils'

export default function CustomSelect ({
  placeholder,
  label,
  items,
  onChange,
  triggerClassname,
  defaultValue
}: {
  placeholder: string
  label: string
  items: Array<{ id: number, description: string }>
  onChange: (value: number) => void
  triggerClassname?: string
  defaultValue?: number
}): JSX.Element {
  return (
    <Select
      onValueChange={value => onChange(Number(value))}
      defaultValue={defaultValue?.toString()}
    >
      <SelectTrigger className={cn('w-[13rem]', triggerClassname ?? '')}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map(item => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
