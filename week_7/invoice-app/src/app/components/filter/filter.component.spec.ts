import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DebugElement } from '@angular/core';
import { invoiceActions } from '../../state/actions/invoice.action';
import { invoiceStatus } from '../../../assets/data/model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let debugElement: DebugElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the filter display text', () => {
    const filterDisplayElement = debugElement.query(
      By.css('.filter-display span')
    ).nativeElement;
    expect(filterDisplayElement.textContent).toContain('Filter by status');
  });

  it('should toggle dropdown when filter display is clicked', () => {
    const filterDisplayElement = debugElement.query(
      By.css('.filter-display')
    ).nativeElement;
    filterDisplayElement.click();
    fixture.detectChanges();
    expect(component.isOpened).toBeTruthy();
  });

  it('should call handleCheckboxChange when a checkbox is changed', () => {
    jest.spyOn(component, 'handleCheckboxChange');
    const checkbox = debugElement.query(
      By.css('input[type="checkbox"]')
    ).nativeElement;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.handleCheckboxChange).toHaveBeenCalled();
  });

  it('should add status to selectedStatuses when checkbox is checked', () => {
    const status: invoiceStatus = 'draft';
    component.handleCheckboxChange(status, true);
    expect(component.selectedStatuses.has(status)).toBeTruthy();
  });

  it('should remove status from selectedStatuses when checkbox is unchecked', () => {
    const status: invoiceStatus = 'draft';
    component.selectedStatuses.add(status);
    component.handleCheckboxChange(status, false);
    expect(component.selectedStatuses.has(status)).toBeFalsy();
  });

  it('should dispatch updateFilters action when checkbox is changed', () => {
    jest.spyOn(store, 'dispatch');
    const status: invoiceStatus = 'draft';
    component.handleCheckboxChange(status, true);
    expect(store.dispatch).toHaveBeenCalledWith(
      invoiceActions.updateFilters({ statuses: [status] })
    );
  });
});
