import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightChatContainerComponent } from './right-chat-container.component';

describe('RightChatContainerComponent', () => {
  let component: RightChatContainerComponent;
  let fixture: ComponentFixture<RightChatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightChatContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightChatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
