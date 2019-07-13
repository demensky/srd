import { TestBed, async } from '@angular/core/testing';
import { BoxesMapComponent } from './boxes-map.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoxesMapComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BoxesMapComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'srd-box'`, () => {
    const fixture = TestBed.createComponent(BoxesMapComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('srd-box');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(BoxesMapComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to srd-box!');
  });
});
