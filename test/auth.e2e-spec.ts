import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) OK', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({"username": "Yolanda_Towne84", "password": "thmDGtzR6SYhG4_"})
            .expect(200);
    });

    it('/auth/login (POST) UNAUTHORIZED', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({"username": "wrongUser", "password": "thmDGtzR6SYhG4_"})
            .expect(403);
    });
});
