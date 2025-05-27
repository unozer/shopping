import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  const mockDialogData = { total: 100, items: [1, 2, 3] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject MAT_DIALOG_DATA', () => {
    expect(component.data).toEqual(mockDialogData);
  });

  it('should display the number of pending items', () => {
    const content = fixture.nativeElement.querySelector('mat-dialog-content span');
    expect(content.textContent).toContain('You have');
    expect(content.textContent).toContain('pending items');
  });

  it('should render Yes and No buttons', () => {
    const yesButton = fixture.debugElement.query(By.css('button[mat-raised-button]'));
    const noButton = fixture.debugElement.query(By.css('button[mat-button]'));
    expect(yesButton.nativeElement.textContent.trim()).toBe('Yes');
    expect(noButton.nativeElement.textContent.trim()).toBe('No');
  });
});