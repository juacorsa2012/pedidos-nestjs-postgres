import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { Constant } from 'src/config/constants'

export const HttpResponseOk = (res: Response, data: any, meta?: any, message: string = "") => {
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    status: Constant.SUCCESS,    
    message,
    data,
    meta    
  })
}

export const HttpResponseCreated = (res: Response, data: any, message: string = "") => {
  return res.status(HttpStatus.CREATED).json({
    statusCode: HttpStatus.CREATED,
    status: Constant.SUCCESS,    
    message,
    data,    
  })
}

export const HttpResponseBadRequest = (res: Response, message: string = "") => {
  return res.status(HttpStatus.BAD_REQUEST).json({
    statusCode: HttpStatus.BAD_REQUEST,
    status: Constant.ERROR,
    message,    
  })
}
