import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
chai.should();

describe('Offices', () => {
  describe('GET all Offices', () => {
    it('should get all Political Office', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
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
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not GET an unregistered political office', (done) => {
      const id = 5;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
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
          res.body.should.have.property('message').eql('Office name and type are required');
          done();
        });
    });
    it('should POST a Political Office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .send({
          type: 'Chairman',
          name: 'LG',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
