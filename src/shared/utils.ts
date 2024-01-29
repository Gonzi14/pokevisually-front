import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export function cn (...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function getRandomNumberBetweenValues (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function capitalizeString (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
