const request = require('supertest');
const http = require('http');
const { app } = require('../index.js');
const { getAllEmployees } = require('../controllers/index');

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getAllEmployees: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controllers Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 5: Mock the Get All Employees Function
  it('should return all employees', () => {
    let mockedEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockedEmployees);

    const result = getAllEmployees();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints testing', () => {
  //Exercise 3: Test Retrieve All Employees
  it('GET /employees endpoint successfully retrieves all employee records', async () => {
    const res = await request(server).get('/employees');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });

  //Exercise 4: Test Retrieve Employee by ID
  it('GET /employees/details/:id endpoint successfully retrieves a specific employee record by ID.', async () => {
    const res = await request(server).get('/employees/details/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});
