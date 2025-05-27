import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KeyLoggerComponent } from './key-logger.component';

describe('KeyLoggerComponent', () => {
  let component: KeyLoggerComponent;
  let fixture: ComponentFixture<KeyLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyLoggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display typed keys', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'abc';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));
    fixture.detectChanges();
    expect(component.keys).toContain('abc');
    const display = fixture.nativeElement.textContent;
    expect(display).toContain('You typed: abc');
  });

  it('should only allow numeric keys when numeric is true', async () => {
    await fixture.componentRef.setInput('numeric', true);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    fixture.detectChanges();
    expect(component.keys).toContain('1');
    expect(component.keys).not.toContain('a');
  });

  it('should allow all keys when numeric is false', async () => {
    await fixture.componentRef.setInput('numeric', false);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    fixture.detectChanges();
    expect(component.keys).toContain('1');
    expect(component.keys).toContain('a');
  });
});
