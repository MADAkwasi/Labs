import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if no token is present', () => {
    localStorage.removeItem('authToken');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return true if token is present', () => {
    localStorage.setItem('authToken', 'test-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should store token on successful login', () => {
    const mockResponse = { token: 'test-token' };
    service.login('username', 'password').subscribe(response => {
      expect(response.token).toBe('test-token');
      expect(localStorage.getItem('authToken')).toBe('test-token');
    });

    const req = httpMock.expectOne(service['authUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should clear token on logout', () => {
    localStorage.setItem('authToken', 'test-token');
    service.logout();
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('should set loading$ to true during login and false after', () => {
    const mockResponse = { token: 'test-token' };
    let loadingStates: boolean[] = [];
    service.loading$.subscribe(loading => loadingStates.push(loading));

    service.login('username', 'password').subscribe();

    const req = httpMock.expectOne(service['authUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(loadingStates).toEqual([false, true, false]);
  });
});
