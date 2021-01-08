const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const expect = require('chai').expect;
chai.use(chaiHttp);

var token, movieId,directorId;

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
					movieId = res.body.data._id;
					done();
				});
		});
	});
	describe('[GET] MOVIE FROM ID', ()=> {
		it('To get movie by the given id', (done)=>{
			chai.request(server)
			.get('/api/movies/'+ movieId)
			.set('x-access-token', token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('title');
				res.body.should.have.property('director_id');
				res.body.should.have.property('category');
				res.body.should.have.property('country');
				res.body.should.have.property('year');
				res.body.should.have.property('imdb_score');
				res.body.should.have.property('_id').eql(movieId);
				done();
			})
		})
	});
	describe('[POST] MOVIE FROM ID', () => {
		it('To post a new movie in db', (done) => {
			const movie = {
				title: 'Editted',
				director_id: '5ff57eba9c91b706d0c7f195',
				category: 'Love',
				country: 'Türkiye',
				year: 1951,
				imdb_score: 9.2
			};

			chai.request(server)
				.put('/api/movies/'+movieId)
				.send(movie)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title').eql(movie.title);
					res.body.should.have.property('director_id').eql(movie.director_id);
					res.body.should.have.property('category').eql(movie.category);
					res.body.should.have.property('country').eql(movie.country);
					res.body.should.have.property('year').eql(movie.year);
					res.body.should.have.property('imdb_score').eql(movie.imdb_score);
					done();
				});
		});
	});
	describe('[DELETE] MOVIE FROM ID', ()=>{
		it('To delete movie from movie_id', (done) => {
			chai.request(server)
			.delete('/api/movies/'+movieId)
			.set('x-access-token',token)
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('title');
				res.body.should.have.property('director_id');
				res.body.should.have.property('category');
				res.body.should.have.property('country');
				res.body.should.have.property('year');
				res.body.should.have.property('imdb_score');
				res.body.should.have.property('_id').eql(movieId);
				done();
			});
		});
	});
});
 