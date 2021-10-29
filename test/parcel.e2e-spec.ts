import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";

describe('ParcelController (e2e)', () => {
    let app: INestApplication;
    let token = '';

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({"username": "Yolanda_Towne84", "password": "thmDGtzR6SYhG4_"})
            .expect(200);

        // store the jwt token for the next request
        token = loginResponse.body.token;
    });

    it('/findAll (GET)', () => {
        return request(app.getHttpServer())
            .get('/parcel')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    });

    it('/create (POST)', async () => {
        return request(app.getHttpServer())
            .post('/parcel')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "description": "new parcel",
                "weight": 12,
                "pickupAddress": "source address 123",
                "deliveryAddress": "delivery address 123",
            })
            .expect(201)
            .expect({
                "description": "new parcel",
                "weight": 12,
                "pickupAddress": "source address 123",
                "deliveryAddress": "delivery address 123",
                "sender": '5',
                "status": 1,
                "id": 1
            })
    });

    it('/create (POST) without required params', () => {
        return request(app.getHttpServer())
            .post('/parcel')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "weight": 12,
                "deliveryAddress": "delivery address 123",
            })
            .expect(400)
    });

    it('/update (PATCH)', async () => {
        await request(app.getHttpServer())
            .post('/parcel')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "description": "new parcel",
                "weight": 12,
                "pickupAddress": "source address 123",
                "deliveryAddress": "delivery address 123",
            })

        return request(app.getHttpServer())
            .patch('/parcel/1')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "deliveryTime": "2021-10-26T07:46:36",
            })
            .expect(200)
            .expect({
                "description": "new parcel",
                "weight": 12,
                "pickupAddress": "source address 123",
                "deliveryAddress": "delivery address 123",
                "sender": '5',
                "status": 1,
                "id": 1,
                "deliveryTime": "2021-10-26T07:46:36",
            })
    });

    it('/update (PATCH) not found', async () => {
        return request(app.getHttpServer())
            .patch('/parcel/999')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "deliveryTime": "2021-10-26T07:46:36",
            })
            .expect(404)
    });

    it('/findOne (GET)', async () => {
        await request(app.getHttpServer())
            .post('/parcel')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "description": "new parcel",
                "weight": 12,
                "pickupAddress": "source address 123",
                "deliveryAddress": "delivery address 123",
            })
        return request(app.getHttpServer())
            .get('/parcel/1')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    });

    it('/findOne (GET) not existent resource', async () => {
        return request(app.getHttpServer())
            .get('/parcel/109')
            .set('Authorization', 'Bearer ' + token)
            .expect(404)
    });

    it('/remove (DELETE)', async () => {
        await request(app.getHttpServer())
            .post('/parcel')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "description": "new parcel",
                "weight": 12,
                "pickupAddress": "source address 123",
                "deliveryAddress": "delivery address 123",
            })
        return request(app.getHttpServer())
            .delete('/parcel/1')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    });

    it('/remove (DELETE) not existent resource', async () => {
        return request(app.getHttpServer())
            .delete('/parcel/109')
            .set('Authorization', 'Bearer ' + token)
            .expect(404)
    });

    it('/findAllBySenderId (GET)', async () => {
        await request(app.getHttpServer())
            .post('/parcel')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "description": "new parcel",
                "weight": 12,
                "pickupAddress": "source address 123",
                "deliveryAddress": "delivery address 123",
            })
        return request(app.getHttpServer())
            .get('/parcel/sender/5')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    });

    it('/findAllBySenderId (GET) - no parcels for sender', async () => {
        return request(app.getHttpServer())
            .get('/parcel/sender/12')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .expect([])
    });

    it('/findAllBySenderId (GET) - not authorized', async () => {
        // setup
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({"username": "Lillie_Monahan", "password": "RTKzfjKN1suSCrb"})
            .expect(200);

        // test
        return request(app.getHttpServer())
            .get('/parcel/sender/1')
            .set('Authorization', 'Bearer ' + loginResponse.body.token)
            .expect(403)
    });

    it('/findAllByBikerId (GET)', async () => {
        // setup
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({"username": "Lillie_Monahan", "password": "RTKzfjKN1suSCrb"})
            .expect(200)

        await request(app.getHttpServer())
            .post('/parcel')
            .set('Authorization', 'Bearer ' + loginResponse.body.token)
            .send({
                "description": "new parcel",
                "weight": 12,
                "pickupAddress": "source address 123",
                "deliveryAddress": "delivery address 123",
            })

        // test
        return request(app.getHttpServer())
            .get('/parcel/biker/15')
            .set('Authorization', 'Bearer ' + loginResponse.body.token)
            .expect(200)
    });

    it('/findAllBikerId (GET) - no parcels for biker', async () => {
        // setup
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({"username": "Lillie_Monahan", "password": "RTKzfjKN1suSCrb"})
            .expect(200)

        // test
        return request(app.getHttpServer())
            .get('/parcel/biker/15')
            .set('Authorization', 'Bearer ' + loginResponse.body.token)
            .expect(200)
            .expect([])
    });

    it('/findAllByBikerId (GET) - not authorized', async () => {
        return request(app.getHttpServer())
            .get('/parcel/biker/15')
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    });

});
