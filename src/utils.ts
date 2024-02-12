import { Request } from 'express'
export function createUrlByIdAndClass( class_name: string, id: string) {
  return `https://swapi.dev/api/${class_name}/${id}/`
}

export function getPrevNext(req: Request, page: number, count: number) {
  let url = `${req.protocol}://${req.get('host')}${req.path}?page=`
  return {
    next: count > page * 10 ? url + (page + 1) : null,
    prev: page > 1 ? url + (page - 1) : null
  }
}