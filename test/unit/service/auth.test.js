const jwt = require('jsonwebtoken');

const { isAuthorized, getUserIdFromToken, getUsernameFromToken } = require('../../../app/service/auth');


describe('Auth Service test', () => {
    beforeEach(() => {
        process.env.JWT_SECRET = 'secret_key123';
    });

    test('isAuthorized should return proper value based on a token', async () => {
        let token = jwt.sign(
            {
                userId: 123,
                username: 'johndoe'
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: 1000
            }
        );
        expect(isAuthorized(token)).toBeTruthy();
        expect(isAuthorized()).toBeFalsy();

        token = jwt.sign(
            {
                userId: 123,
                username: 'johndoe'
            },
            'different_secret',
            {
                algorithm: 'HS256',
                expiresIn: 1000
            }
        );
        expect(isAuthorized(token)).toBeFalsy();

        token = jwt.sign(
            {
                userId: 123,
                username: 'johndoe'
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: 2
            }
        );
        expect(isAuthorized(token)).toBeTruthy();

        function sleep(ms){
            return new Promise(resolve=>{
                setTimeout(resolve,ms)
            })
        }

        await sleep(2500);
        expect(isAuthorized(token)).toBeFalsy();
    });

    test('getUserIdFromToken should return proper user id', async () => {
        let token = jwt.sign(
            {
                userId: 123,
                username: 'johndoe'
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: 1000
            }
        );
        expect(getUserIdFromToken(token)).toEqual(123);
    });

    test('getUsernameFromToken should return proper username', async () => {
        let token = jwt.sign(
            {
                userId: 123,
                username: 'johndoe'
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: 1000
            }
        );
        expect(getUsernameFromToken(token)).toEqual('johndoe');
    });
});

