const request = require('supertest');
const app = require('./app');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);



describe('Server', () => {
  
  beforeEach(async () => {
    await database.seed.run()
  })

  describe('init', () => {
    it('should return a 200 status', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /projects', () => {
    
    it('should return all projects', async () => {
      //SETUP
      const expectedProjects = await database('projects').select();
      const expectedProject = expectedProjects[0].name;
      //EXECUTION
      const response = await request(app).get('/api/v1/projects');
      const project = response.body[0].name;

      //EXPECTATION
      expect(response.status).toBe(200);
      expect(expectedProject).toEqual(project);

    });
  });

  describe('GET /projects/:id', () => {
    
    it('should return the project with the specified id', async () => {
      
      const expectedProject = await database('projects').first();
      const projectId = parseInt(expectedProject.id);

      const response = await request(app).get(`/api/v1/projects/${projectId}`);
      const project = response.body;

      expect(project.name).toEqual(expectedProject.name);
      
    });
    
    it('should return a status of 404 if there is no match to the query parameter', async () => {

      const response = await request(app).get(`/api/v1/projects/0`);

      expect(response.status).toBe(404)
    });

  });
    
  
  describe('POST /api/v1/projects', () => {
    
    it('should post a new project', async () => {
      const projects = await request(app).get('/api/v1/projects');
      expect(projects.body.length).toBe(2);
      
      const newProject = { name: 'Living Room' }
      const response = await request(app).post('/api/v1/projects').send(newProject);
      
      const updatedProjects = await request(app).get('/api/v1/projects');
      expect(updatedProjects.body.length).toBe(3);

    });
    
    it('should return the project id with a status of 201 if the post is successful', async () => {
      const newProject = { name: 'Kitchen' }
      const response = await request(app).post('/api/v1/projects').send(newProject);
      
      const id = parseInt(response.body.id);
      const expectedProject = await database('projects').first({ id });
      const projectId = parseInt(expectedProject.id);
      
      expect(id).toEqual(projectId);
      expect(response.status).toBe(201);
      
    });
    
    it('should return a status of 422 if no name is provided in the request body', async () => {
      const newProject = { name: ''};
      
      const response = await request(app).post('/api/v1/projects').send(newProject);

      expect(response.status).toBe(422);

    });

  });

  describe('PATCH /projects/:id', () => {
    
    it('should update an existing project', async () => {

      const existingProject = await database('projects').first();
      const id = existingProject.id;
      const updatedProject = { name: 'Updated Project' };

      const response = await request(app).patch(`/api/v1/projects/${id}`).send(updatedProject);

      const project = await database('projects').where('id', id);

      expect(response.status).toBe(202);
      expect(project[0].name).toEqual(updatedProject.name);
    });

    it('should return a status of 404 if the requested project does not exist', async () => {

      const response = await request(app).get(`/api/v1/projects/0`);

      expect(response.status).toBe(404);

    });
    
  });
  
  describe('DELETE /projects/:id', () => {
    
    it('should delete an existing project', async () => {
      const projectToDelete = await database('projects').first(); 
          
      const response = await request(app).delete(`/api/v1/projects/${projectToDelete.id}`);
      
      const updatedProjects = await database('projects').select();
      const updatedPalettes = await database('palettes').where('project_id', projectToDelete.id);
      console.log(updatedProjects)
      console.log(updatedPalettes)

      expect(response.status).toBe(202);
      expect(updatedProjects.length).toBe(1);
      expect(updatedPalettes.length).toBe(0);
    });

    it('should return a status of 404 if the requested project does not exist', async () => {
      const response = await request(app).get(`/api/v1/projects/0`);

      expect(response.status).toBe(404)
    });

  });

  describe('GET /api/v1/palettes', () => {
    it('should return 200 and all palettes', async () => {
      const expected = await database('palettes').select();
      const response = await request(app).get('/api/v1/palettes');
      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(expected.length);
    });
  });

  describe('GET /palette/:id', () => {
    it('should return a specific palette from the db if palette exists', async () => {
      const expectedPalette = await database('palettes').first();
      const id = expectedPalette.id;
      const response = await request(app).get(`/api/v1/palettes/${id}`);
      expect(response.body.name).toEqual(expectedPalette.name);
    });
    it('should return a status of 404 if palette id does not exist', async () => {
      const id = 0;
      const response = await request(app).get(`/api/v1/palettes/${id}`);
      const status = response.status;
      expect(status).toBe(404);
    });
  });

  describe('POST /api/v1/palettes', () => {
    let mockPalette;

    beforeEach(async () => {
      const { id: project_id } = await database('projects').first();
      mockPalette = {
        name: 'Mock Palette',
        color_1: '#FFFFF',
        color_2: '#FFFFF',
        color_3: '#FFFFF',
        color_4: '#FFFFF',
        color_5: '#FFFFF',
        project_id
      };
    });
  
  });
});

