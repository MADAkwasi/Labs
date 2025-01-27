import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCardComponent } from './delete-card.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('DeleteCardComponent', () => {
  let component: DeleteCardComponent;
  let fixture: ComponentFixture<DeleteCardComponent>;
  let debugElement: DebugElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCardComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '123' },
            },
          },
        },
        { provide: Router, useValue: { navigate: jest.fn() } },
        {
          provide: ToastrService,
          useValue: { success: jest.fn(), error: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and message', () => {
    const titleElement = debugElement.query(
      By.css('app-text[type="emphasis"]')
    ).nativeElement;
    const messageElement = debugElement.query(
      By.css('app-text[size="1.3rem"]')
    ).nativeElement;

    expect(titleElement.textContent).toContain('Confirm Deletion');
    expect(messageElement.textContent).toContain(
      'Are you sure you want to delete invoice #'
    );
  });
});
