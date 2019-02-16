import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';


chai.use(chaiHttp);
chai.should();

describe('Offices', () => {
  describe('GET all Offices', () => {
    it('should get all Political Office', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .set('x-access-token', `${jwt.sign({ userId: 1 }, process.env.SECRET, { expiresIn: '7d' })}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should GET a single political office', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .set('x-access-token', `${jwt.sign({ userId: 1 }, process.env.SECRET, { expiresIn: '7d' })}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not GET an unregistered political office', (done) => {
      const id = 100;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .set('x-access-token', `${jwt.sign({ userId: 1 }, process.env.SECRET, { expiresIn: '7d' })}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Office id not found');
          done();
        });
    });
  });

  describe('POST Political Office', () => {
    it('it should not POST a Political Office without a name and type', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should POST a Political Office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .set('x-access-token', `${jwt.sign({ userId: 1, userRole: true }, process.env.SECRET, { expiresIn: '7d' })}`)
        .send({
          type: 'Chairman',
          name: 'LGA',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
