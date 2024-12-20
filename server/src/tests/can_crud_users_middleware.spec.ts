const roles: any = {
    '1111': 'user',
    '2222': 'manager',
    '2223': 'manager',
    '3333': 'admin'
}

class MockUsersOperations {
    getUserById (id: string) {
        return {
            role: roles[id]
        }
    }
}

jest.mock('@server/db/operations/users.operations', () => ({
    UsersOperations: MockUsersOperations
}));

import { canCRUDUser } from '@server/middleware/can_crud_users'
const middleware = canCRUDUser as any

const makeMockRes = (id: string) => {
    return {
        locals: {
            user: {
                id,
                role: roles[id]
            }
        },
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
}

const makeMockReq = (user_id: string) => {
    return {
        params: {
            user_id
        },
    }
}

test('should run next for reading self', async () => {
    const next = jest.fn()
    const res = makeMockRes('1111')
    const req = makeMockReq('1111')
    await middleware(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
})

test('should not run next if user tries to crud manager', async () => {
    const next = jest.fn()
    const res = makeMockRes('1111')
    const req = makeMockReq('2222')
    let err = null
    await middleware(req, res, next)
    expect(next).toHaveBeenCalledTimes(0)
})

test('should not run next if manager tries to crud manager', async () => {
    const next = jest.fn()
    const res = makeMockRes('2222')
    const req = makeMockReq('2223')
    let err = null
    await middleware(req, res, next)
    expect(next).toHaveBeenCalledTimes(0)
})

test('should not run next if manager tries to crud admin', async () => {
    const next = jest.fn()
    const res = makeMockRes('2222')
    const req = makeMockReq('3333')
    let err = null
    await middleware(req, res, next)
    expect(next).toHaveBeenCalledTimes(0)
})

test('should run next if admin tries to crud user', async () => {
    const next = jest.fn()
    const res = makeMockRes('3333')
    const req = makeMockReq('1111')
    let err = null
    await middleware(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
})

test('should run next if admin tries to crud manager', async () => {
    const next = jest.fn()
    const res = makeMockRes('3333')
    const req = makeMockReq('2222')
    let err = null
    await middleware(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
})

test('should run next if admin tries to crud admin', async () => {
    const next = jest.fn()
    const res = makeMockRes('3333')
    const req = makeMockReq('2222')
    let err = null
    await middleware(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
})