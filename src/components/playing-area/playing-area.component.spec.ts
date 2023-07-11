import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingAreaComponent } from './playing-area.component';
import {ApiDataService} from "../../services/api-data.service";

describe('PlayingAreaComponent', () => {
  let apiDataService: ApiDataService
  let component: PlayingAreaComponent;
  let fixture: ComponentFixture<PlayingAreaComponent>;
  beforeEach(() => { apiDataService = new ApiDataService(); });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayingAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getValue should return real value', () => {
    expect(apiDataService.getCharacters()).toBe();
  });

  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
      service.getObservableValue().subscribe(value => {
        expect(value).toBe('observable value');
        done();
      });
    });
});
