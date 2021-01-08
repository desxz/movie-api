const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const expect = require('chai').expect;
chai.use(chaiHttp);

var token,directorId;

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
	describe('[GET] DIRECTORS', () => {
		it('It should GET all the directors', (done) => {
			chai.request(server)
			.get('/api/directors')
			.set('x-access-token',token)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			})
		});
	})
	describe('[POST] DIRECTORS', () => {
		it('To post a new director in db', (done) => {
			const director = {
				name: 'Hakkı',
				surname: 'Bulut',
				bio: 'En İyi Komedi Filmi (2011)',
			};

			chai.request(server)
				.post('/api/directors')
				.send(director)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name');
					res.body.should.have.property('surname');
					res.body.should.have.property('bio');
					directorId = res.body._id;
					done();
				});
		});
    });
    describe('[GET] DIRECTOR FROM ID', ()=> {
		it('To get director by the given id', (done)=>{
			chai.request(server)
			.get('/api/directors/'+ directorId)
			.set('x-access-token', token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body[0].should.be.a('object');
				res.body[0].should.have.property('name');
				res.body[0].should.have.property('surname');
				res.body[0].should.have.property('bio');
				res.body[0].should.have.property('_id').eql(directorId);
				done();
			})
		})
    });
    describe('[POST] DIRECTOR FROM ID', () => {
		it('To edit a new director in db', (done) => {
			const director = {
                name:'Udemy',
                surname: 'TEST',
                bio: 'NodeJS Test',
			};

			chai.request(server)
				.put('/api/directors/'+directorId)
				.send(director)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql(director.name);
					res.body.should.have.property('surname').eql(director.surname);
					res.body.should.have.property('bio').eql(director.bio);
					done();
				});
		});
    });
    describe('[DELETE] DIRECTOR FROM ID', ()=>{
		it('To delete director from director', (done) => {
			chai.request(server)
			.delete('/api/directors/'+directorId)
			.set('x-access-token',token)
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name');
				res.body.should.have.property('surname');
				res.body.should.have.property('bio');
				res.body.should.have.property('_id').eql(directorId);
				done();
			});
		});
	});
});
 