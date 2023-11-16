import { setupWorker } from 'msw/browser'
import { getTodosMock } from './endpoints/get-todos'
import { HttpHandler } from 'msw'


const handlers: HttpHandler[] = [getTodosMock]
 
export const worker = setupWorker(...handlers)