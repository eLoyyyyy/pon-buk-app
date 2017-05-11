var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');

describe('User', () => {
  let sampleId = 'xxx'; // i know this test is fucked up.
  it('should insert new contact', (done) => {
    const newUser = {
      name: 'Mike',
      contact_number: '8-7000'
    };

    api.post('/users')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.equal(true);
        expect(res.body).to.have.property('newId');
        expect(res.body.newId).to.not.equal(null);
        expect(res.body.newId).to.not.equal('undefined');
        sampleId = res.body.newId;
        api.get(`/users/${res.body.newId}`)
          .expect(200)
          .end((err, resp) => {
            expect(resp.body).to.have.property('contact');
            expect(resp.body.contact).to.be.a('object');
            expect(resp.body.contact).to.have.property('cn_id');
            expect(resp.body.contact.cn_id).to.not.equal(null);
            expect(resp.body.contact).to.have.property('name');
            expect(resp.body.contact.name).to.not.equal(null);
            expect(resp.body.contact.name).to.equal(newUser.name);
            expect(resp.body.contact).to.have.property('contact_number');
            expect(resp.body.contact.contact_number).to.not.equal(null);
            expect(resp.body.contact.contact_number).to.equal(newUser.contact_number);
          });
        done();
      });
  });

  it('should return okay on existing account', (done) => {
    api.get(`/users/${sampleId}`)
      .expect(200, done);
  });

  it('should return 404 on non-existent account', (done) => {
    api.get('/users/non-existent-account')
      .expect(404, done);
  });

  it('should have correct properties', (done) => {
    api.get(`/users/${sampleId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('contact');
        expect(res.body.contact).to.not.equal([]);

        expect(res.body.contact).to.have.property('cn_id');
        expect(res.body.contact.cn_id).to.not.equal(null);
        expect(res.body.contact).to.have.property('name');
        expect(res.body.contact.name).to.not.equal(null);
        expect(res.body.contact).to.have.property('contact_number');
        expect(res.body.contact.contact_number).to.not.equal(null);
        done();
      });
  });

  it('should correctly update existing contact', (done) => {
    const modifiedContact = {
      name: 'Mikey',
      contact_number: '86236'
    };

    api.put(`/users/${sampleId}`)
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(modifiedContact)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.equal(1);
        api.get(`/users/${sampleId}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.property('contact');
            expect(res.body.contact).to.be.a('object');
            expect(res.body.contact).to.have.property('name');
            expect(res.body.contact.name).to.not.equal(null);
            expect(res.body.contact.name).to.equal(modifiedContact.name);
            expect(res.body.contact).to.have.property('contact_number');
            expect(res.body.contact.contact_number).to.not.equal(null);
            expect(res.body.contact.contact_number).to.equal(modifiedContact.contact_number);
          });
        done();
      });
  });

  it('should delete the account', (done) => {
    api.delete(`/users/${sampleId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.equal(1);
        api.get(`/users/${sampleId}`)
          .expect(404);
        done();
      });
  });

  it('should get an empty list of contacts', (done) => {
    api.get('/users')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('contacts');
        expect(res.body.contacts.length).to.equal(0);
        done();
      });
  });

});
