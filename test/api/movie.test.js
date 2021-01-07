const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

var token;

describe('Authentication [TOKEN]', () => {
	before((done) => {
		chai.request(server)
		.post('/authenticate')
		.send({username:"admin", password: "admin123"})
		.end((err,res) => {
			token = res.body.token;
			done();
		})
	});
	describe('[GET] MOVIES', () => {
		it('It should GET all the movies', (done) => {
			chai.request(server)
			.get('/api/movies')
			.set('x-access-token',token)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			})
		});
	});
});
