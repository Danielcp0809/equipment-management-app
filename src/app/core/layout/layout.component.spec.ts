import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material/material.module';
import { CoreRoutingModule } from '../core-routing.module';

import { LayoutComponent } from './layout.component';

fdescribe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>; // environment to interact with the component

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [MaterialModule, CoreRoutingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h1> with "Equipment Management"', () => {
    const titleDebug: DebugElement = fixture.debugElement;
    const h1Debug: DebugElement = titleDebug.query(By.css('h1'))
    const titleElement: HTMLElement = h1Debug.nativeElement;
    expect(titleElement?.textContent).toBe('Equipment Management');
  });
});



