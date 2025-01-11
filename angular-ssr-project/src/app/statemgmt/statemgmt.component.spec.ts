import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatemgmtComponent } from './statemgmt.component';

describe('StatemgmtComponent', () => {
  let component: StatemgmtComponent;
  let fixture: ComponentFixture<StatemgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatemgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatemgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
