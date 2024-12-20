import { Request, Response, NextFunction } from 'express';
import { isAdmin } from '@server/middleware/is_admin'
const middleware = isAdmin as any

const makeMockRes = (role: string) => {
    return {
        locals: {
            user: {
                role 
            }
        },
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
}

test('expect isAdmin to call next for admin', async () => {
    const res = makeMockRes('admin')
    const next = jest.fn()
    await middleware(null, res, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledTimes(0)
})

test('expect isAdmin to call status(403) for manager', async () => {
    const res = makeMockRes('manager')
    const next = jest.fn()
    await middleware(null, res, next)
    expect(res.status).toHaveBeenCalledWith(403)
})

test('expect isAdmin to call status(403) for user', async () => {
    const res = makeMockRes('user')
    const next = jest.fn()
    await middleware(null, res, next)
    expect(res.status).toHaveBeenCalledWith(403)
})