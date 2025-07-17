import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssistanceComponent } from './create-assistance.component';

describe('CreateAssistanceComponent', () => {
  let component: CreateAssistanceComponent;
  let fixture: ComponentFixture<CreateAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
