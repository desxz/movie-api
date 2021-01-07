const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const expect = require('chai').expect;
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
	describe('[POST] MOVIE', () => {
		it('To post a new movie in db', (done) => {
			const movie = {
				title: 'Udemy',
				director_id: '5ff57eba9c91b706d0c7f195',
				category: 'Komedi',
				country: 'Türkiye',
				year: 1950,
				imdb_score: 8
			};

			chai.request(server)
				.post('/api/movies')
				.send(movie)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('title');
					res.body.data.should.have.property('director_id');
					res.body.data.should.have.property('category');
					res.body.data.should.have.property('country');
					res.body.data.should.have.property('year');
					res.body.data.should.have.property('imdb_score');
					done();
				});
		});
	});
});
