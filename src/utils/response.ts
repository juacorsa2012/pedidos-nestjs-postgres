import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { Constant } from 'src/config/constants'

export const HttpResponseOk = (res: Response, data: any, message: string = "") => {
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    status: Constant.SUCCESS,    
    message,
    data,    
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