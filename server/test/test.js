import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
chai.should();

describe('Parties', () => {
  describe('GET Parties', () => {
    it('should get all Political Parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should GET a single political party', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not GET an unregistered political party', (done) => {
      const id = 5;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Party id not found');
          done();
        });
    });
  });

  describe('POST Party', () => {
    it('it should not POST a Political Party without a name', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send({
          logoUrl: 'www.image.com/img.jpg',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Party name is required');
          done();
        });
    });
    it('should POST a Political Party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send({
          name: 'Nigeria Political Party',
          logoUrl: 'www.image.com/img.jpg',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('PATCH Party', () => {
    it('should EDIT a Political Party name', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`/api/v1/parties/${id}/name`)
        .send({
          name: 'Political Party Name',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE Party', () => {
    it('should DELETE a Political Party', (done) => {
      const id = 1;
      chai.request(app)
        .delete(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

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
