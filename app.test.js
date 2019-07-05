import request from 'supertest';
import app from './app';

const environment = process.env.NOTE_ENV || 'test';
// const configuration = require('./knexfile')[environment];
// const database = require('knex')(configuration);
// 



describe('Server', () => {
  // beforeEach(async () => {
  //   await database.seed.run()
  //   })
  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /projects', () => {
    
    it('should return all projects', async () => {
      
    });
    
    it('should return the project with the specified id', async () => {
      
    });
    
    it('should return a status of 404 if there is no match to the query parameter', async () => {
    
    });
    
  });
  
  describe('POST /projects', () => {
    
    it('should post a new project', async () => {
      
    });

    it('should return a status of 422 if no name is provided in the request body', async () => {
      
    });

  });

  describe('PATCH /projects/:id', () => {
    
    it('should update an existing project', async () => {
      
    });

    it('should return a status of 404 if the requested project does not exist', async () => {
      
    });
    
  });
  
  describe('DELETE /projects/:id', () => {
    
    it('should delete an existing project', async () => {
      
    });

    it('should return a status of 404 if the requested project does not exist', async () => {
      
    });

  });

});

