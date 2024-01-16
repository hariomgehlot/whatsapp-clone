import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightChatHeaderComponent } from './right-chat-header.component';

describe('RightChatHeaderComponent', () => {
  let component: RightChatHeaderComponent;
  let fixture: ComponentFixture<RightChatHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightChatHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightChatHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
