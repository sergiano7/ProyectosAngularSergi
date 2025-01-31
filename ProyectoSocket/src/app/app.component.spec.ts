import { TestBed } from '@angular/core/testing';
import { ChatComponent } from './pages/chat/chat.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ChatComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ProyectoSocket' title`, () => {
    const fixture = TestBed.createComponent(ChatComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ProyectoSocket');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ChatComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ProyectoSocket');
  });
});
