import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a valid ID', () => {
    const id = service.generateId();
    expect(id).toMatch(/^[A-Z]{2}\d{4}$/);
  });

  it('should generate unique IDs', () => {
    const id1 = service.generateId();
    const id2 = service.generateId();
    expect(id1).not.toEqual(id2);
  });
});
